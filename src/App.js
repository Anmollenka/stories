import React from 'react';

const useSemiPersistentState = key => {
  const [value, setValue] = React.useState(
  localStorage.getItem(key) || ''
  );
  React.useEffect(() => {
  localStorage.setItem(key, value);
  }, [value, key]);
  return [value, setValue];
  };
const App=()=> 
  {
    const stories = [
      {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
      },
      {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
      },
      ];
      const [searchTerm, setSearchTerm] = useSemiPersistentState('search');
      const handleChange = event => {
        setSearchTerm(event.target.value);
      }
     const searchStories=stories.filter((story)=> story.title.toLowerCase().includes(searchTerm.toLowerCase()))
      
    return(
    <div>
        <h1>My Hacker Stories</h1>
        <InputWithLabel id="search" label="Search" value={searchTerm} onInputChange={handleChange}>
        Search:
        </InputWithLabel>
        <hr />
        <List list={searchStories} />
    </div>
  )};
  const List = ({ list }) =>
  list.map(({ objectID, ...item }) => <Item key={objectID} {...item} />);

  const Item = ({ title, url, author, num_comments, points }) => (
  <div>
  <span>
  <a href={url}>{title}</a>
  </span>
  <span>{author}</span>
  <span>{num_comments}</span>
  <span>{points}</span>
  </div>
  );


  const InputWithLabel = ({id,value,onInputChange ,children})=>(
    <>
    <label htmlFor={id}>{children} </label>
    <input id={id} type="text" onChange={onInputChange} value={value}/>
    </>
  );







export default App;
