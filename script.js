const profileCard = document.getElementById('profileCard');
const profileImage = profileCard.querySelector('.profile-image');
const profileName = profileCard.querySelector('h2');
const profileAge = profileCard.querySelector('.profile-age');
const profileDescription = profileCard.querySelector('.profile-description');

// Replace the data below with actual profile data.
const profiles = [
    {
        name: 'John Doe',
        age: 30,
        description: 'A short description goes here...',
        image: 'profile1.jpg',
    },
    {
        name: 'Jane Smith',
        age: 28,
        description: 'Another person to swipe...',
        image: 'profile2.jpg',
    },
    // Add more profiles as needed.
];
const databaseRef = firebase.database().ref("profiles");
let currentProfileIndex = 0;

function showProfileCreationForm() {
    document.getElementById('profileCreationForm').style.display = 'block';
    document.getElementById('profileCard').style.display = 'none';
}

function createProfile() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const description = document.getElementById('description').value;
    const profileImage = document.getElementById('profileImage').files[0];

    // Validate profile data (you can add more validation as needed)
    if (!name || !age || !description || !profileImage) {
        alert('Please fill in all profile details.');
        return;
    }

    const newProfile = {
        name,
        age: parseInt(age),
        description,
        image: URL.createObjectURL(profileImage),
    };

    // Save the new profile data to the Firebase Realtime Database
  const databaseRef = firebase.database().ref("profiles");
  const newProfileRef = databaseRef.push();
  newProfileRef.set({
    name,
    age: parseInt(age),
    description,
    image: "", // We'll update this with the Firebase Storage URL later
  });

  // Upload the profile image to Firebase Storage and update the profile data
  const storageRef = firebase.storage().ref(`profile_images/${newProfileRef.key}`);
  storageRef.put(profileImage).then((snapshot) => {
    // Get the download URL of the uploaded image
    snapshot.ref.getDownloadURL().then((downloadURL) => {
      // Update the profile data with the download URL of the image
      newProfileRef.update({ image: downloadURL });

      // Clear the form fields and hide the profile creation form
      document.getElementById("name").value = "";
      document.getElementById("age").value = "";
      document.getElementById("description").value = "";
      document.getElementById("profileImage").value = "";
      document.getElementById("profileCreationForm").style.display = "none";
      document.getElementById("profileCard").style.display = "block";

      // Load the newly created profile for swiping
      loadProfile(currentProfileIndex);
    });
  });
}

function logout() {
    firebase
        .auth()
        .signOut()
        .then(() => {
            document.getElementById("loginPage").style.display = "block";
            document.getElementById("mainPage").style.display = "none";
        });
}

function loadProfile(index) {
    databaseRef.once("value").then((snapshot) => {
        const profiles = snapshot.val();
        const profileIds = Object.keys(profiles);
        const profileId = profileIds[index];
        const profile = profiles[profileId];

        profileImage.style.backgroundImage = `url(${profile.image})`;
        profileName.textContent = profile.name;
        profileAge.textContent = `Age: ${profile.age}`;
        profileDescription.textContent = `Description: ${profile.description}`;
    });
}

function handleLike() {
    // Handle like action here (e.g., add the current profile to a liked list).
    // For simplicity, we'll just move to the next profile for demonstration purposes.
    swipeCard('like');
}

function handleDislike() {
    // Handle dislike action here (e.g., add the current profile to a disliked list).
    // For simplicity, we'll just move to the next profile for demonstration purposes.
    swipeCard('dislike');
}

function swipeCard(action) {
    const className = action === 'like' ? 'like' : 'dislike';
    profileCard.classList.add(className);

    setTimeout(() => {
        profileCard.classList.remove(className);
        currentProfileIndex++;
        if (currentProfileIndex >= profiles.length) {
            alert('No more profiles to swipe.');
            currentProfileIndex = 0;
        }
        loadProfile(currentProfileIndex);
    }, 300);
}

// Load the first profile on page load.
loadProfile(currentProfileIndex);
    
    // Add the new profile to the profiles array
    profiles.push(newProfile);

    // Clear the form fields and hide the profile creation form
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    document.getElementById('description').value = '';
    document.getElementById('profileImage').value = '';
    document.getElementById('profileCreationForm').style.display = 'none';
    document.getElementById('profileCard').style.display = 'block';

    // Load the newly created profile for swiping
    loadProfile(profiles.length - 1);

