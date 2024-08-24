import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import styled from '@emotion/styled';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
  height: '300px',
  overflow: 'hidden',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'auto',
  scrollSnapType: 'x mandatory',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  height: '100%',
  scrollBehavior: 'smooth',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'center',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Image = styled.img(() => ({
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const Button = styled.button(() => ({
  position: 'absolute',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
  width: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const PrevButton = styled(Button)`
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
`;

const NextButton = styled(Button)`
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`;

const UserInfo = styled.div(() => ({
  padding: '10px',
  borderBottom: '1px solid #ccc',
  backgroundColor: '#f9f9f9',
  display: 'flex',
  alignItems: 'center',
}));

const UserInitials = styled.div(() => ({
  fontSize: '18px',
  fontWeight: 'bold',
  marginRight: '10px',
}));

const Post = ({ post }) => {
  const carouselRef = useRef(null);

  const scrollToIndex = (index) => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.children[0].offsetWidth;
      const centerOffset = (carouselRef.current.clientWidth - itemWidth) / 2;
      carouselRef.current.scrollTo({
        left: index * itemWidth - centerOffset,
        behavior: 'smooth',
      });
    }
  };

  const handleNextClick = () => {
    if (carouselRef.current) {
      const index = Math.min(
        carouselRef.current.children.length - 1,
        Math.round(
          (carouselRef.current.scrollLeft + carouselRef.current.clientWidth) /
            carouselRef.current.children[0].offsetWidth
        )
      );
      scrollToIndex(index);
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      const index = Math.max(
        0,
        Math.round(
          (carouselRef.current.scrollLeft - carouselRef.current.clientWidth) /
            carouselRef.current.children[0].offsetWidth
        )
      );
      scrollToIndex(index);
    }
  };

  const userNameInitials = post.user ?
    `${post.user.name.split(' ')[0][0]}${post.user.name.split(' ')[1] ? post.user.name.split(' ')[1][0] : ''}`
    : '';

  return (
    <PostContainer>
      <UserInfo>
        <UserInitials>{userNameInitials}</UserInitials>
        <div>
          <p><strong>{post.user ? post.user.name : 'Unknown User'}</strong></p>
          <p>{post.user ? post.user.email : 'No email available'}</p>
        </div>
      </UserInfo>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    content: PropTypes.any,
    images: PropTypes.shape({
      map: PropTypes.func,
    }),
    title: PropTypes.any,
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
    }),
  }),
};

export default Post;
