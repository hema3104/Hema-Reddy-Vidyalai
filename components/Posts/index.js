import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import useWindowWidth from '../hooks/useWindowWidth';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0); // Track the current page

  const { isSmallerDevice } = useWindowWidth();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const limit = isSmallerDevice ? 5 : 10;
        const [postsResponse, usersResponse] = await Promise.all([
          axios.get('/api/v1/posts', {
            params: { start: page * limit, limit },
          }),
          axios.get('/api/v1/users'),
        ]);

        const newPosts = postsResponse.data;
        setPosts(prevPosts => [...prevPosts, ...newPosts]);
        setUsers(usersResponse.data);
        setHasMore(newPosts.length > 0); // Determine if there are more posts to load
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isSmallerDevice, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  // Mapping user data to posts
  const postsWithUser = posts.map(post => {
    const user = users.find(user => user.id === post.userId);
    return { ...post, user };
  });

  return (
    <Container>
      <PostListContainer>
        {postsWithUser.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </PostListContainer>

      {hasMore && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LoadMoreButton onClick={handleLoadMore} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        </div>
      )}
    </Container>
  );
}

/*import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import useWindowWidth from '../hooks/useWindowWidth';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { isSmallerDevice } = useWindowWidth();

  useEffect(() => {
    const fetchPost = async () => {
      const { data: posts } = await axios.get('/api/v1/posts', {
        params: { start: 0, limit: isSmallerDevice ? 5 : 10 },
      });
      setPosts(posts);
    };

    fetchPost();
  }, [isSmallerDevice]);

  const handleClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map(post => (
          <Post post={post} />
        ))}
      </PostListContainer>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <LoadMoreButton onClick={handleClick} disabled={isLoading}>
          {!isLoading ? 'Load More' : 'Loading...'}
        </LoadMoreButton>
      </div>
    </Container>
  );
}*/
