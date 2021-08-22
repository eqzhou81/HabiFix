## HabiFix - Fix your Habits!

### Inspiration
Do you have a habit that you want to fix? We sure do. As high school students studying for exams, we noticed we were often distracted by our phones, which greatly reduced our productivity. A study from Duke University found that up to 45% of all our daily actions are performed habitually, which is a huge problem especially during a time when many of us are confined to our homes, negatively impacting our productivity, as well as mental and physical health.

To fix this issue, we created HabiFix. We took the advice from a Harvard research paper to create a program that would not only help break unhealthy habits, but form healthy ones in place as well.  

### What it does
Unlike many other products which have to be installed by professionals, highly specialized for one single habit, or just expensive, HabiFix only requires a computer with a webcam, and can help you fix a multitude of different habits. And the usage is very simple too, just launch HabiFix on your computer, and that’s it! HabiFix will run in the background, and as soon as you perform an undesirable habit, it will remind you. According to Harvard Health Publishing, the most important thing in habit fixing is a reminder, since people often perform habits without realizing it. So when you’re studying for tomorrow’s test and pick up your phone, your computer will gently remind you to get off your phone, so you can ace that test.

Every action you do is uploaded to our website, which users can see statistics of by logging in. Another important aspect of Habit Fixing that Harvard found is reward, which we believe we can provide users by showing them their growth over time. On the website, users are able to view how many times they had to be reminded, and by showing them how they have been requiring less reminders throughout the week, they’ll be able to know they have been fixing their habits.  

### How we built it (Frontend and Backend)

The backbone of HabiFix rests on Tensorflow, which uses machine learning to detect the user’s actions. We wrote a program that would provide webcam data to TensorFlow, more specifically an object-detection model that utilizes computer vision, and the output data is then analyzed by our python code to determine if a user is performing a specific task. We then created a simple flask API which saves the information to our database as well as connects to our frontend. which, our built with React, and Chart.js was used to display data that was collected, and we spent hours tinkering with the CSS to create the best UX possible. 

### Challenges we ran into
The biggest challenge we ran into was incorporating the machine learning aspect in it, as it was our first time using TensorFlow. While setting up the object detection algorithm using TensorFlow, we had difficulties installing all the dependencies and modules, and spent quite some time properly understanding the TensorFlow documentation which was needed to get outputs for analysis. However, after sleepless nights and a newfound love for coffee, we were able to finish setting up TensorFlow and write a program to extract the data and analyze it, which worked better than we thought it would, catching our developers on their phones even during development.  

### Accomplishments
We’re quite proud of the accuracy that our program has in detecting habits and believe it is the key reason why this program will be so effective. So far, unless you make a conscious effort to hide from the camera, which wouldn’t be the case for those wanting to remove a habit, the program will detect the habit almost instantly. The fact that our program caught us off guard on our phones during development is a clear indicator that our program does what it’s supposed to, and we hope to use this tool ourselves to continue development and break our own bad habits.  

### What we learned
Our team pretty much learnt everything we had to use for this project. The only tools that our team were familiar with were basic HTML/CSS and Python, which not all the members knew how to use. Throughout development, we learnt a lot about frontend, backend, and database development, and TensorFlow is definitely a tool we’re happy to have learnt.  

### What’s next
In the future, we hope to add to our list of habits that we can detect, and possibly create a mobile application to track habits even when users are away from their computer. We believe this idea has serious potential for preventing not only simple habits like biting nails, but also other habits such as drug and substance abuse and addiction.  

### Technologies used

Python  
HTML  
CSS  
Javascript  
React.js  
Tensorflow  
Flask  
OpenCV  
Cockroach DB  
Github  
