import useState from 'react'

const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3003/chat/groups', {
        params: {
          userId: props.userId,
        }
      });
      if (response.status === 200) {
        setConvData(response.data);
    }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  export default fetchData 