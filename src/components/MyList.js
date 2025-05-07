import React, { Component, useState } from "react";

// Class-based List component
class FriendsManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: ['Luna', 'Neville', 'Ginny'],
      newFriend: '',
    };
  }

  // Handle adding a new friend
  handleAddFriend = (e) => {
    e.preventDefault();
    const { newFriend, friends } = this.state;
    if (newFriend.trim() !== '') {
      this.setState({
        friends: [...friends, newFriend],
        newFriend: '',
      });
    }
  };

  // Handle removing a friend
  handleRemoveFriend = (friendToRemove) => {
    const { friends } = this.state;
    this.setState({
      friends: friends.filter((friend) => friend !== friendToRemove),
    });
  };

  // Handle change in the input field for new friend
  handleInputChange = (e) => {
    this.setState({ newFriend: e.target.value });
  };

  render() {
    const { friends, newFriend } = this.state;
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">Friends Manager (Class-based)</h2>

        {/* Form to add a friend */}
        <form className="d-flex mb-4" onSubmit={this.handleAddFriend}>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Add a new friend..."
            value={newFriend}
            onChange={this.handleInputChange}
          />
          <button type="submit" className="btn btn-primary">Add</button>
        </form>

        {/* Friends list with remove buttons */}
        <ul className="list-group">
          {friends.map((friend) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={friend}>
              {friend}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => this.handleRemoveFriend(friend)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// Function-based ListTwo component
function ListTwo() {
  const [friends, setFriends] = useState(['Luna', 'Neville', 'Ginny']);
  const [newFriend, setNewFriend] = useState('');

  // Handle adding a new friend
  const handleAddFriend = (e) => {
    e.preventDefault();
    if (newFriend.trim() !== '') {
      setFriends([...friends, newFriend]);
      setNewFriend('');
    }
  };

  // Handle removing a friend
  const handleRemoveFriend = (friendToRemove) => {
    setFriends(friends.filter((friend) => friend !== friendToRemove));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Friends Manager (Dynamic)</h2>

      {/* Form to add a friend */}
      <form className="d-flex mb-4" onSubmit={handleAddFriend}>
        <input
          type="text"
          className="form-control me-2"
          placeholder="Add a new friend..."
          value={newFriend}
          onChange={(e) => setNewFriend(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Add</button>
      </form>

      {/* Friends list with remove buttons */}
      <ul className="list-group">
        {friends.map((friend) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={friend}>
            {friend}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleRemoveFriend(friend)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { FriendsManager, ListTwo };
