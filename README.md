# AI Game Collection

A collection of browser-based games created using AI assistance, featuring minimal code modifications. Experience engaging gameplay with a modern, responsive interface at [AI Game Collection](https://aigamecollection.com).

## 🎮 Available Games

### Nerdle

A nerdy twist on the famous word game. Guess the hidden "nerdy" word in 6 tries.

### Pipes

Connect the pipes to create a continuous flow. Test your logical thinking skills with this challenging puzzle game that requires strategic planning and spatial awareness.

### Memory

A classic card-matching game that helps improve concentration and recall abilities. Test your memory by finding matching pairs of cards in this timeless brain-training exercise.

### Minesweeper

Classic Minesweeper game with a modern touch. Clear the board without hitting any mines in this strategic puzzle game.

### Snake

Classic snake game with a modern twist. Eat the food, grow longer, and try not to hit the walls or yourself!

### Soccer Juggle

Keep the soccer ball in the air for as long as possible. Challenge yourself to achieve your highest juggling streak in this addictive skill-based game.

### Water Ring Toss

Test your skill and patience in this classic water game! Use precision to land all the rings onto the pegs. How many can you score? (_Mobile Only_)

### Waveform

Guide particles to their targets by shaping a wave using frequency, amplitude, and phase controls while avoiding obstacles in this unique physics puzzle.

### Bubble Pop

Pop the bubbles before they escape! A fast-paced game of precision and reflexes that will keep you on your toes.

### Breakout

Break the bricks, level up, and beat your high score! A fast-paced game of skill and strategy for all ages.

### Space Shooter

Pilot your spaceship and navigate through an asteroid field. Shoot or evade asteroids in this fast-paced arcade challenge.

### Space Shooter II

Pilot your upgraded spaceship through dense asteroid fields with enhanced graphics and physics. Dodge or destroy asteroids in this fast-paced arcade sequel, and collect crystals to earn points and boost your score.

### Flapping Bird

Flapping Bird is a simple arcade game where you tap to keep a bird in the air and guide it through gaps between pipes without crashing.

### Deep Sea Escape

Guide your fish through underwater coral reefs in this aquatic adventure.

## 📸 Screenshots

<div align="center">
    <img src="https://raw.githubusercontent.com/jeremehancock/AI-Game-Collection/refs/heads/main/images/screenshots/home-updated-again.png" width="300" alt="Game Menu"/>
    <img src="https://raw.githubusercontent.com/jeremehancock/AI-Game-Collection/refs/heads/main/images/screenshots/nerdle.png" width="300" alt="Nerdle"/>
    <img src="https://raw.githubusercontent.com/jeremehancock/AI-Game-Collection/refs/heads/main/images/screenshots/pipes.png" width="300" alt="Pipes Puzzle"/>
    <img src="https://raw.githubusercontent.com/jeremehancock/AI-Game-Collection/refs/heads/main/images/screenshots/memory.png" width="300" alt="Memory Game"/>
    <img src="https://raw.githubusercontent.com/jeremehancock/AI-Game-Collection/refs/heads/main/images/screenshots/minesweeper.png" width="300" alt="Minesweeper"/>
    <img src="https://raw.githubusercontent.com/jeremehancock/AI-Game-Collection/refs/heads/main/images/screenshots/snake-game.png" width="300" alt="Snake Game"/>
    <img src="https://raw.githubusercontent.com/jeremehancock/AI-Game-Collection/refs/heads/main/images/screenshots/soccer-juggle.png" width="300" alt="Soccer Juggle Game"/>
    <img src="https://raw.githubusercontent.com/jeremehancock/AI-Game-Collection/refs/heads/main/images/screenshots/water-ring-toss-game.png" width="300" alt="Water Ring Toss"/>
    <img src="https://raw.githubusercontent.com/jeremehancock/AI-Game-Collection/refs/heads/main/images/screenshots/waveform-game.png" width="300" alt="Waveform"/>
     <img src="https://raw.githubusercontent.com/jeremehancock/AI-Game-Collection/refs/heads/main/images/screenshots/bubble-pop-game.png" width="300" alt="Bubble Pop"/>
    <img src="https://raw.githubusercontent.com/jeremehancock/AI-Game-Collection/refs/heads/main/images/screenshots/breakout.png" width="300" alt="Breakout"/>
    <img src="https://raw.githubusercontent.com/jeremehancock/AI-Game-Collection/refs/heads/main/images/screenshots/space-shooter-game.png" width="300" alt="Space Shooter"/>
    <img src="https://raw.githubusercontent.com/jeremehancock/AI-Game-Collection/refs/heads/main/images/screenshots/space-shooter-game-2.png" width="300" alt="Space Shooter II"/>
    <img src="https://raw.githubusercontent.com/jeremehancock/AI-Game-Collection/refs/heads/main/images/screenshots/flapping-bird-game-updated.png" width="300" alt="Flapping Bird"/>
    <img src="https://raw.githubusercontent.com/jeremehancock/AI-Game-Collection/refs/heads/main/images/screenshots/deep-sea-escape-game-updated.png" width="300" alt="Deep Sea Escape"/>

</div>

## 🚀 Features

- Clean, modern UI with a dark theme
- Responsive design that works on all devices
- Smooth transitions and animations
- Easy navigation between games
- Fullscreen game mode with quick return to menu
- Minimalist design focused on gameplay

## 🛠️ Technical Details

The site is built using:

- HTML5
- CSS3 (with modern features like CSS Grid and Flexbox)
- Vanilla JavaScript
- SVG icons for game representations
- Responsive iframe implementation for game loading

## 🎨 Design Features

- Gradient backgrounds
- Hover animations
- Responsive card layout
- Adaptive spacing and sizing
- Accessibility considerations

## 📱 Responsive Design

The site adapts seamlessly to different screen sizes:

- Desktop: Full grid layout
- Tablet: Adjusted card sizes
- Mobile: Single column layout with optimized spacing

## 🌐 Browser Support

Works on all modern browsers including:

- Chrome
- Firefox
- Safari
- Edge

## 🔄 Usage

### 🌐 Website Access

Visit [AI Game Collection](https://aigamecollection.com) and click on any game card to start playing. Use the back button in the bottom-left corner to return to the game selection screen.

### 📱 Progressive Web App (PWA)

Install the collection as a PWA for a native app-like experience:

#### iOS Installation

1. Open Safari and visit [AI Game Collection](https://aigamecollection.com/)
2. Tap the Share button (square with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Choose a name and tap "Add"

#### Android Installation

1. Visit [AI Game Collection](https://aigamecollection.com) in Chrome
2. Tap the menu (three dots)
3. Select "Add to Home Screen"
4. Follow the prompts to install

### 📲 Android App

For Android users preferring a native experience:

[![Get it on Google Play](https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png)](https://play.google.com/store/apps/details?id=dev.jereme.games.twa)

## 🐳 Run Locally in Docker

You can run the game collection locally using Docker in two ways:

### Option 1: Pull from Docker Hub

1. Pull the image:

```bash
docker pull bozodev/ai-game-collection:latest
```

2. Run the container:

```bash
docker run -d -p 38008:80 bozodev/ai-game-collection:latest
```

### Option 2: Build Locally

1. Clone the repository:

```bash
git clone https://github.com/jeremehancock/AI-Game-Collection.git
cd ai-game-collection
```

2. Build the Docker image:

```bash
docker build -t ai-game-collection .
```

3. Run the container:

```bash
docker run -d -p 38008:80 ai-game-collection
```

### Access and Management

Once running with either option:

- Access the games by opening your browser and visiting `http://localhost:38008/`
- View running containers: `docker ps`
- Stop the container: `docker stop <container-id>`

## 🤖 AI Development

This project showcases the possibilities of AI-assisted development, with all games and the main interface being primarily built using AI tools, requiring minimal manual code adjustments.

## 📈 Future Development

The collection is designed to be easily expandable, allowing for new games to be added while maintaining consistent design and user experience.

---

_Created with AI assistance - Demonstrating the potential of AI in game development_
