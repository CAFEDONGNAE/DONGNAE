import { useState, useEffect } from 'react';
import { fetchProfile } from '../services/authService';

const MyProfileCard = () => {
  const [profile, setProfile] = useState({});

  const handleProfile = async () => {
    const loadProfileResult = await fetchProfile();

    if (loadProfileResult.success) {
      setProfile(loadProfileResult.data.member);
    } else {
      alert('프로필 불러오기 실패');
    }
  };

  useEffect(() => {
    handleProfile();
  }, []);

  return (
    <div>
      <h3>내 프로필</h3>
      <p>닉네임 : {profile.name}</p>
      <p>이메일 : {profile.email}</p>
    </div>
  );
}

export default MyProfileCard;