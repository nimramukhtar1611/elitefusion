import { useState, useEffect } from 'react';


export const useGameJams = () => {
  const [gameJams, setGameJams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGameJams = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock data for now since this is for game jams, not individual games
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData = [
        {
          id: 1,
          title: "Global Game Jam 2025",
          description: "The world's largest student game jam in support of Games for Change.",
          startDate: "2025-01-20",
          endDate: "2025-01-26",
          participants: 1500,
          status: "upcoming",
          theme: "Innovation",
          registrationOpen: true,
          location: "Worldwide"
        },
        {
          id: 2,
          title: "Indie Game Challenge",
          description: "Create innovative games with cutting-edge technology.",
          startDate: "2025-02-15",
          endDate: "2025-02-22",
          participants: 800,
          status: "registration_open",
          theme: "Sustainability",
          registrationOpen: true,
          location: "Online"
        },
        {
          id: 3,
          title: "Mobile Game Jam",
          description: "Focus on creating amazing mobile gaming experiences.",
          startDate: "2025-03-10",
          endDate: "2025-03-17",
          participants: 600,
          status: "upcoming",
          theme: "Accessibility",
          registrationOpen: false,
          location: "Hybrid"
        }
      ];
      
      setGameJams(mockData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGameJams();
  }, []);

  return {
    gameJams,
    loading,
    error,
    refetch: fetchGameJams,
  };
};


export default useGameJams;