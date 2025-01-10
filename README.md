# Internal Community Hub for Developers

This platform serves as an internal community hub for developers at our company. It provides various features to categorize developers, publish contributions, reward contributions, upgrade developer levels, track top contributors, and manage training sessions.

## Key Features

- **Developer Categorization**: Categorize developers into four levels based on their experience and contributions: Explorer, Contributor, Innovator, and Visionary.
- **Publish Contributions**: Allow developers to publish their contributions, such as learning articles, code snippets, and project implementations.
- **Coin-based Reward System**: Reward contributions with coins and automatically upgrade developer levels based on coin milestones.
- **Leaderboard**: Track top contributors and display their achievements.
- **Training Sessions**: Publish upcoming training sessions and record training-related activities.

## Setup and Run the Project

1. **Clone the repository**:
   ```bash
   git clone https://github.com/githubnext/workspace-blank.git
   cd workspace-blank
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the necessary environment variables. For example:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/community-hub
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the application**:
   ```bash
   npm start
   ```

5. **Access the application**:
   Open your browser and go to `http://localhost:3000` to access the platform.
