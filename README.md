# AI Game Collection

A collection of browser-based games created using AI assistance, featuring minimal code modifications. Experience engaging gameplay with a modern, responsive interface at [AI Game Collection](https://aigamecollection.com).

## 🎮 Featured Games

### Pipes

Connect the pipes to create a continuous flow. Test your logical thinking skills with this challenging puzzle game that requires strategic planning and spatial awareness.

### Pipes II

A polished sequel to Pipes. Rotate the pipes to link the source to the drain and watch the water flow through with animated feedback. Features guaranteed-solvable puzzles, three difficulty levels, a move and time tracker, and a win celebration.

### Bubble Pop II

A polished sequel to Bubble Pop. Pop floating bubbles to build combos and multipliers, and master special bubbles &mdash; golden for bonus points, frozen that cracks before popping, bombs that clear a blast radius, and rainbows that trigger slow-motion with double score. Avoid the spiked bubbles, manage your lives, and climb through progressive levels.

### Soccer Juggle

Keep the soccer ball in the air for as long as possible. Challenge yourself to achieve your highest juggling streak in this addictive skill-based game.

### Breakout

Break the bricks, level up, and beat your high score! A fast-paced game of skill and strategy for all ages.

### Space Shooter II

Pilot your upgraded spaceship through dense asteroid fields with enhanced graphics and physics. Dodge or destroy asteroids in this fast-paced arcade sequel, and collect crystals to earn points and boost your score.

### Deep Sea Escape

Guide your fish through underwater coral reefs in this aquatic adventure.

## 📸 Featured Screenshots

<div align="center">
    <img src="https://raw.githubusercontent.com/jeremehancock/AI-Game-Collection/refs/heads/main/images/screenshots/home-updated-3.png" width="300" alt="Game Menu"/>
    <img src="https://raw.githubusercontent.com/jeremehancock/AI-Game-Collection/refs/heads/main/images/screenshots/pipes.png" width="300" alt="Pipes"/>
    <img src="https://raw.githubusercontent.com/jeremehancock/AI-Game-Collection/refs/heads/main/images/screenshots/soccer-juggle.png" width="300" alt="Soccer Juggle Game"/>
    <img src="https://raw.githubusercontent.com/jeremehancock/AI-Game-Collection/refs/heads/main/images/screenshots/breakout.png" width="300" alt="Breakout"/>
    <img src="https://raw.githubusercontent.com/jeremehancock/AI-Game-Collection/refs/heads/main/images/screenshots/space-shooter-game-2.png" width="300" alt="Space Shooter II"/>
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

## License

[MIT License](LICENSE)

---

_Created with AI assistance - Demonstrating the potential of AI in game development_
