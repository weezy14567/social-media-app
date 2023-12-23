// import axios from 'axios';
// import React, { useContext, useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import FormGroup from 'react-bootstrap/FormGroup';
// import Form from 'react-bootstrap/Form';
// import { Link, useParams } from 'react-router-dom';
// import { Store } from '../Store';

// function ProfileUpdatePic(props) {
//   const { state } = useContext(Store);
//   const { userInfo } = state;
//   const { user } = props;
//   const params = useParams();
//   const { userId } = params;

//   const [updateUser, setUpdateUser] = useState('');

//   const handleUpdateUser = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.put(
//         `http://localhost:4000/api/users/${userId}`,
//         {
//           gender: gender,
//           email: email,
//         }
//       );
//       setUpdateUser(data);
//       console.log(data);
//       setClikLink(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const [clickLink, setClikLink] = useState(null);
//   const [gender, setGenderName] = useState(user.gender || 'male');
//   const [email, setEmail] = useState(user.email || '');

//   const handleLinkClicked = (link) => {
//     setClikLink(link);
//   };

//   return (
//     <div
//       style={{
//         height: '100vh',
//         width: '100vw',
//         backgroundColor: 'rgba(255, 255, 255, 0.739)',
//         overflow: 'hidden',
//         position: 'fixed',
//       }}   className={clickLink === 'picture' ? 'd-flex flex-column' : 'd-none'}
//     >
//       <div
//         style={{
//           width: '500px',
//           height: '200px',
//           backgroundColor: 'white',
//           margin: 'auto',
//           marginTop: '8%',
//           position: 'relative',
//         }}
//         className="d-flex flex-column justify-content-center align-items-center"
//       >
//         <Form onSubmit={handleUpdateUser} encType="multipart/form-data">
//           <div
//             className="d-flex flex-column gap-3 text-black text-start"
//             style={{ opacity: '0.7' }}
//           >
//             <FormGroup>
//               <Form.Control
//                 label="Update Profile"
//                 type="file"
//                 onChange={handleFiles}
//               />
//             </FormGroup>
//             <Button type="submit">upload</Button>

//             <Link className="text-decoration-none">
//               <strong className=" d-flex gap-3 align-items-center">
//                 <i className="fa fa-book" aria-hidden="true"></i>Add a frame
//               </strong>
//             </Link>
//             <Link className="text-decoration-none">
//               <strong className=" d-flex gap-3 align-items-center">
//                 <i className="fa fa-user" aria-hidden="true"></i> Create avatar
//               </strong>
//             </Link>
//           </div>
//           <strong
//             onClick={() => setProfileToggle(!profileToggle)}
//             style={{ position: 'absolute', top: 0, right: 30, opacity: '0.6' }}
//             className="fs-3 text-black"
//           >
//             X
//           </strong>
//         </Form>
//       </div>
//     </div>
//   );
// }

// export default ProfileUpdatePic;
