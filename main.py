import numpy as np
import os
import six.moves.urllib as urllib
import sys
import tarfile
import tensorflow as tf
import zipfile
import pathlib
from collections import defaultdict
from io import StringIO
from matplotlib import pyplot as plt
from PIL import Image
from IPython.display import display
from object_detection.utils import ops as utils_ops
from object_detection.utils import label_map_util
from object_detection.utils import visualization_utils as vis_util
from datetime import datetime
import json
from win10toast import ToastNotifier

while "models" in pathlib.Path.cwd().parts:
    os.chdir('..')


def load_model(model_name):
    base_url = 'http://download.tensorflow.org/models/object_detection/'
    model_file = model_name + '.tar.gz'
    model_dir = tf.keras.utils.get_file(
        fname=model_name,
        origin=base_url + model_file,
        untar=True)

    model_dir = pathlib.Path(model_dir) / "saved_model"
    model = tf.saved_model.load(str(model_dir))
    return model


PATH_TO_LABELS = 'models/research/object_detection/data/mscoco_label_map.pbtxt'
category_index = label_map_util.create_category_index_from_labelmap(PATH_TO_LABELS, use_display_name=True)

model_name = 'ssd_inception_v2_coco_2017_11_17'
detection_model = load_model(model_name)


def run_inference_for_single_image(model, image):
    image = np.asarray(image)
    # The input needs to be a tensor, convert it using `tf.convert_to_tensor`.
    input_tensor = tf.convert_to_tensor(image)
    # The model expects a batch of images, so add an axis with `tf.newaxis`.
    input_tensor = input_tensor[tf.newaxis, ...]

    # Run inference
    model_fn = model.signatures['serving_default']
    output_dict = model_fn(input_tensor)

    # All outputs are batches tensors.
    # Convert to numpy arrays, and take index [0] to remove the batch dimension.
    # We're only interested in the first num_detections.
    num_detections = int(output_dict.pop('num_detections'))
    output_dict = {key: value[0, :num_detections].numpy()
                   for key, value in output_dict.items()}
    output_dict['num_detections'] = num_detections

    # detection_classes should be ints.
    output_dict['detection_classes'] = output_dict['detection_classes'].astype(np.int64)

    # Handle models with masks:
    if 'detection_masks' in output_dict:
        # Reframe the the bbox mask to the image size.
        detection_masks_reframed = utils_ops.reframe_box_masks_to_image_masks(
            output_dict['detection_masks'], output_dict['detection_boxes'],
            image.shape[0], image.shape[1])
        detection_masks_reframed = tf.cast(detection_masks_reframed > 0.5,
                                           tf.uint8)
        output_dict['detection_masks_reframed'] = detection_masks_reframed.numpy()

    return output_dict

toast = ToastNotifier()
active=[False]*90
activecheck=[0]*90
lasttime = datetime.now()
timer = 0
habits = {
    "phone":{
        "nCount": 0,
        "nDuration": 0,
        "cDuration": 0
    },
    "junkfood":{
        "nCount": 0,
        "nDuration": 0,
        "cDuration": 0
    },
    "sitting":{
        "nCount": 0,
        "nDuration": 0,
        "cDuration": 0
    },
    "water":{
        "nCount": 0,
        "nDuration": 0,
        "cDuration": 0
    }
}

def show_inference(model, frame):
    global activecheck
    # take the frame from webcam feed and convert that to array
    image_np = np.array(frame)
    # Actual detection.
    output_dict = run_inference_for_single_image(model, image_np)
    # Visualization of the results of a detection.
    vis_util.visualize_boxes_and_labels_on_image_array(
        image_np,
        output_dict['detection_boxes'],
        output_dict['detection_classes'],
        output_dict['detection_scores'],
        category_index,
        instance_masks=output_dict.get('detection_masks_reframed', None),
        use_normalized_coordinates=True,
        line_thickness=5)
    # This is the way I'm getting my coordinates
    boxes = output_dict['detection_boxes']
    # get all boxes from an array
    max_boxes_to_draw = boxes.shape[0]
    # get scores to get a threshold
    scores = output_dict['detection_scores']
    # this is set as a default but feel free to adjust it to your needs
    min_score_thresh = .5
    visible = []
    # iterate over all objects found
    for i in range(min(max_boxes_to_draw, boxes.shape[0])):
        #
        if scores is None or scores[i] > min_score_thresh:
            # boxes[i] is the box which will be drawn
            class_name = category_index[output_dict['detection_classes'][i]]['name']
            #print("This box is gonna get used", boxes[i], output_dict['detection_classes'][i])
            visible.append([output_dict['detection_classes'][i],boxes[i]])
            activecheck[output_dict['detection_classes'][i]-1]+=1
    global timer
    global active
    timer+=1

    if(timer==10):
        timer=0
        global lasttime
        addtime = (datetime.now() - lasttime).seconds + ((datetime.now() - lasttime).microseconds) / 1000000
        lasttime = datetime.now()
        for i in range(len(active)):
            if(activecheck[i]<8):
                if(active[i]):
                    active[i]=False
                    #print(str(i) + " is hidden")

                    if (i == 76):
                        print("User has ended habit: Phone. Took: "+str(habits["phone"]["cDuration"])+" seconds!")
                        habits["phone"]["cDuration"] = 0
                    elif (i == 58 or i==59 or i==60 or i==61):
                        habits["junkfood"]["cDuration"] = 0
                    elif (i == 0):
                        habits["sitting"]["cDuration"] = 0
                    elif (i == 43):
                        habits["water"]["cDuration"] = 0
            else:
                if (not active[i]):
                    active[i]=True
                    #print(str(i)+" is visible")
                    if (i == 76):
                        habits["phone"]["nCount"] += 1
                        print("User has begun habit: Phone")
                        toast.show_toast("HabiFix", "Get off your phone!", duration=20, icon_path="icon.ico",threaded=True)
                    elif (i == 58 or i==59 or i==60 or i==61):
                        habits["junkfood"]["nCount"] += 1
                    elif (i == 0):
                        habits["sitting"]["nCount"] += 1
                    elif (i == 43):
                        habits["water"]["nCount"] += 1

                if (i == 76):
                    habits["phone"]["nDuration"] += addtime
                    habits["phone"]["cDuration"] += addtime
                elif (i == 58 or i==59 or i==60 or i==57):
                    habits["junkfood"]["nDuration"] += addtime
                    habits["junkfood"]["cDuration"] += addtime
                elif (i == 0):
                    habits["sitting"]["nDuration"] += addtime
                    habits["sitting"]["cDuration"] += addtime
                elif (i == 43):
                    habits["water"]["nDuration"] += addtime
                    habits["water"]["cDuration"] += addtime
        #print(habits)
        activecheck=[0]*90
        f = open(os.path.join(os.path.dirname(os.path.realpath(__file__)),"server","example.json"),"w")
        f.write(json.dumps(habits))
        f.close()









    return (image_np)




#Now we open the webcam and start detecting objects
import cv2
video_capture = cv2.VideoCapture(0)
while True:

    # Capture frame-by-frame
    re,frame = video_capture.read()
    Imagenp=show_inference(detection_model, frame)
    cv2.imshow('object detection', cv2.resize(Imagenp, (800,600)))
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break






video_capture.release()
cv2.destroyAllWindows()