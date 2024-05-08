# Type50
"Type50" is a typing game which works with HTML, CSS and JavaScript.

# Video Demo
<URL>　https://youtu.be/-SL8W9yWbR0

# Description
This game is aim for people who start to learn computer science.
You can learn about some often used words about computer science with typing!

-List of words-

"high level language", "low level language", "source code", "executable file", "compiler language",
"interpreter language", "commit", "rollback", "bug", "debug",
"path", "variable", "assignment", "boolean datatype", "arithmetic operator",
"comparison operator", "logical operator", "function", "comment", "client",
"server", "model-view-controller", "database", "SQL", "framework"

These words need to know to learning programming!
Almost of them are used many times!

# Features
"Type50" is used no special library.
Source code of this game is very simple, so you can edit it easily.

By using z-index controlled by JavaScript, it makes possible to run the game from start to finish in only one HTML file.

The z-index is like a layer, allowing completely different layout "div" tags to be overlaid.

This will ensure smooth operation. Users will not be frustrated by loading at each scene transition.

# Requiment
Visual Studio Code
Version: 1.71.2

# How To Play
If you press a mouse in "home.html", the game will start after 3 seconds.
In "Type50", you can play to see how many words you can type accuracy.

This game needs more accuracy to get a high score, if you type very fast but
make some mistakes, you can only get a low score!

If you click tytle on top of the page, you can restart the game!

# Install to VScode for cs50

make a parent directory, and also make directories named "static" and "templates".
```bash
project / static, templates
```

make a JavaScript file named "type50.js" in "project", and copy & paste the code in original file.
```bash
project / static, templates, type50.js
```

copy & paste "correct.mp3" and "miss.mp3" in "project" directory.
```bash
project / static, templates, type50.js, correct.mp3, miss.mp3
```

make a CSS file named "styles.css" in "static", and copy & paste the code in original file.
```bash
project / static / styles.css
```

make a HTML file named "home.html" in "templates", and copy & paste the code in original file.
```bash
project / templates / home.html
```

# Running the game

move to "project" directory
```bash
cd project
```

launch http server
```bash
http-server
```

click "templates/"

click "home.html"

Now you can play Type50!

# Improvement Point
* Enhance gameplay
ex)  *add accuracy bonus (If type correctly 10 times in a low, player get additional 1 second remaining time)
     *User Registration (It makes possible to see previous results and show the ranking)

* Build using flask (If the functions are going to be complex, it would be better to have a controller.)

# Note
I don't test in environment of Mac or Linux.

This game assumes playing on PC, it can happen troubles if you playing on other device.

# Author

* Hayashi Tomoya
* E-mail : tomokazu1342[AT]gmail.com

# Audio Files
1. タイプライター・タイプ→チン→改行

    URL: https://on-jin.com/sound/index.php

2. 呼び出しベル

    URL: https://on-jin.com/sound/index.php


Note: These audio file have been edit in accordance with the Terms of Use.