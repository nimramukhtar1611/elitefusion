const API_BASE_URL = 'http://localhost:5000/api'; 
class GameService {
  async uploadGame(gameData) {
    try {
      const formData = new FormData();
      formData.append('title', gameData.title);
      formData.append('githubLink', gameData.githubLink);
      formData.append('coverImage', gameData.coverImage);
      formData.append('author', gameData.author || 'Muhammad-Irfanum');

      const response = await fetch(`${API_BASE_URL}/games`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Upload failed');
      }

      return result.data;
    } catch (error) {
      console.error('Upload failed:', error);
      throw new Error(error.message || 'Failed to upload game. Please try again.');
    }
  }

  async getAllGames() {
    try {
      const response = await fetch(`${API_BASE_URL}/games`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Fetch failed');
      }

      return result.data;
    } catch (error) {
      console.error('Fetch failed:', error);
      return this.getMockGames();
    }
  }

  getMockGames() {
    return [
      {
        id: 1,
        title: "Space Adventure",
        githubLink: "https://github.com/Muhammad-Irfanum/space-adventure",
        coverImage: "/api/placeholder/400/300",
        author: "Muhammad-Irfanum",
        uploadedAt: "2025-08-08T22:19:48Z",
        plays: 142,
        likes: 23
      }
    ];
  }
}

export default new GameService();