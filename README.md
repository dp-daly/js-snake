# serpens.js

![](./README%20images/overview.png)

## Description

Serpens.js is a version of the classic snake arcade game. The snake begins moving as soon as the game begins and the player must control its direction using keyboard arrow presses. 

In this version, the snake sprite must eat croissants to grow and pick up speed.

The more croissants the snake eats the faster it gets, and the more difficult it is for the player to control.

![](./README%20images/Screenshot%202024-05-09%20at%2016.17.52.png)

The number of croissants eaten can be tracked in the console column on the left-hand side of the page as a rudimentary way to keep score.

![](./README%20images/score.png)

### Access

You can play the game in your browser here: 

## Functionality

A landing page introduces the player to the game's mascot. A bee who gives game state updates throughout.

![](./README%20images/Screenshot%202024-05-09%20at%2016.19.15.png)

The player can control the snake sprite using keyboard arrow presses. The default scroll is prevented on arrow keys to avoid scroll issues during gameplay.

The browser automatically plays background music, and sound effects are included for eating croissants and game over. Background music can be toggled on and off using the buttons in the top-right corner.

![](./README%20images/Screenshot%202024-05-09%20at%2016.28.53.png)

There is a restart button in the console area to reset the game after game over.

## Alternative theme

![](./README%20images/Screenshot%202024-05-09%20at%2016.29.10.png)

Players can choose an alternative dark mode for the game, which takes the form of a night theme with space objects. 

The sprite transforms into an alien avatar and the bee character becomes an astronaut. The board becomes a night sky.

![](./README%20images/Screenshot%202024-05-09%20at%2016.29.41.png)

## Accessibility

High contrast colour pairings are used throughout the game. A dark mode is included to provide a wider palette range for diverse players.

Most graphics are added using CSS background-image, but aria labels are used within html containers to substitute for image alt text.

## Improvements

Future improvements may include: 

* A rule to prevent the croissant from appearing on current sprite coordinates.

* Tailored character text for the alternative theme.

* A condition to prevent the game from ending if any key other than an arrow key is pressed. 

* Optimisation for smartphones and tablets.

* High score display to last throughout the session, and possibly repeat visits.

## Acknowledgments

Pixel art background illustrations for both themes from craftpix.net, granted with royalty free usage in unlimited projects.

Snake sprite from anyrgb.com. 

Alien sprite and other graphics created on canva.com. 

Background music and sound effects from zapsplat.com.