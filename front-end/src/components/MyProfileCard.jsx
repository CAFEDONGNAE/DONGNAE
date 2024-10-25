import { useState, useEffect } from 'react';
import mockApi from '../services/mockApi';

const MyProfileCard = () => {
  const [profile, setProfile] = useState({});

  const handleProfile = async () => {
    try {
      const response = await mockApi.get('/members/profile');

      if (response.sta === 200) {
        console.log('내 프로필 불러오기 성공', response);
        setProfile((response.data.member));
      }
    } catch (error) {
      console.error(error, '내 프로필 불러오기 실패');
    }
  };

  useEffect(() => {
    handleProfile();
  }, []);

  return (
    <div>
      <h3>내 프로필</h3>
      <p>{profile.name}</p>
      <p>{profile.email}</p>
    </div>
  );
}

export default MyProfileCard;