import React from 'react';
import './profile.css'
import profile_banner from '../../assets/profile_banner.png'
import profile_pic from '../../assets/profile.jpg'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Profile = () => {
  const { performer_id } = useParams(); // Access the parameter from the URL
  let dataAsString;

  useEffect(() => {
    const getperformer = async () => {
      try {
        const response = await fetch(`http://localhost:4000/performer/${performer_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch performer data');
        }
        const data = await response.json();
        console.log(data); // Process the data as needed
        dataAsString = JSON.parse(data);

        data.forEach((performer) => {
          const performerId = performer.performer_id;
          const performerName = performer.performer_name;
          const description = performer.description;
          
          // Display the data on the frontend as needed
          console.log(`Performer ID: ${performerId}`);
          console.log(`Performer Name: ${performerName}`);
          console.log(`Description: ${description}`);
        });

      } catch (err) {
        console.error(err.message);
      }
    };
    getperformer();
  },[]);

  return (
    <div className='profile section__padding'>
      <div className="profile-top">
        <div className="profile-banner">
          <img src={profile_banner} alt="banner" />
        </div>
        <div className="profile-pic">
            <img src={profile_pic} alt="profile" />
            <h3>{performer_id}</h3>
        </div>
      </div>
      <div className="profile-bottom">
        <p className="Description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam felis velit, commodo eu pellentesque eget, blandit a augue. Sed id laoreet erat, id lobortis nulla. Donec dapibus placerat neque et hendrerit. Duis ut leo diam. Maecenas blandit sapien ut justo aliquam, at accumsan velit molestie. Proin lacinia mi lectus, ultrices ornare nulla tempus a. Duis gravida dui eget vehicula consectetur. Maecenas ac suscipit magna. Integer lacinia, magna ac faucibus ornare, velit nisl malesuada mi, at eleifend nisi nunc quis nisl. Praesent sit amet nunc vel lacus porta placerat nec quis nunc.
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed non neque nibh. Morbi vel sodales dolor, id semper tortor. Mauris a ligula vitae diam venenatis vestibulum sed et quam. Nulla blandit, est et pharetra rhoncus, nulla lorem iaculis odio, at tempus magna nibh non ex. Etiam a mauris sed felis pulvinar ultrices eu non ligula. Fusce vitae lacus vel ex interdum condimentum rhoncus sit amet arcu. Nullam lobortis massa at nisl aliquet, eu finibus arcu convallis. Nullam eleifend, eros vel elementum viverra, ex justo suscipit nunc, vehicula consectetur dolor velit quis tortor. Suspendisse mollis fringilla lacus, ac tempus nulla volutpat non. Donec condimentum arcu nec mi imperdiet, a tempor turpis aliquam. Nam mattis in quam at volutpat.Aliquam id malesuada lectus, sed molestie mi. Curabitur non ipsum rutrum, aliquet massa at, malesuada urna. Pellentesque lobortis arcu a justo laoreet porttitor. Nullam suscipit, nisl vitae sodales laoreet, elit risus efficitur sapien, non rhoncus diam nisi in dui. In quis est eleifend, dignissim dolor in, aliquam justo. Proin vestibulum nunc id erat gravida lobortis. Aliquam erat volutpat. Vivamus sagittis dolor et ullamcorper dapibus.
          Etiam non euismod justo. Vivamus pharetra, erat at dapibus ornare, sapien nunc tincidunt lacus, vitae dignissim dolor elit et lectus. Praesent vitae ipsum elit. Ut sit amet eleifend nisi. Vivamus consectetur vitae mi eu bibendum. Nunc nunc mi, elementum eu ultricies id, posuere at metus. Pellentesque aliquet porttitor tincidunt. Integer dui magna, ornare sit amet erat sed, egestas fringilla urna. Donec accumsan eros in est tristique hendrerit. Pellentesque euismod venenatis lectus id tristique. Fusce fringilla nisi hendrerit nisi accumsan, non scelerisque magna ultrices. Curabitur sed leo ligula. Proin sed elementum felis. Vivamus non vestibulum leo.
          </p>
      </div>
    </div>
  );
};

export default Profile;
