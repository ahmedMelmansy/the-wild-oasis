import styled from "styled-components";
import { useUser } from './useUser';
import defaultAvatar from '../data/img/default-user.jpg';

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 3.6rem;
  height: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

export default function UserAvatar() {
  const { user } = useUser();

  // Safeguard في حالة user null
  if (!user) return null;

  const fullName = user.user_metadata?.fullName || user.email?.split('@')[0] || "User";
  const avatarSrc = user.user_metadata?.avatar || defaultAvatar;

  return (
    <StyledUserAvatar>
      <Avatar src={avatarSrc} alt={fullName} />
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
}