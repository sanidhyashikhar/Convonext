import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, db } from "./firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Added `getDoc` import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faUser,
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useUser } from "./UserContext"; // Import the UserContext

const AuthSignInSignOut = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setCurrentUser } = useUser(); // Access `setCurrentUser` from context
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();

    if (isSignUp && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        const userId = userCredential.user.uid;
        await saveUserToFirestore(userId, formData.name, formData.email);
        setCurrentUser({
          id: userId,
          email: formData.email,
          name: formData.name,
        }); // Update UserContext
        navigate("/home");
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        const userId = userCredential.user.uid;

        // Fetch user details from Firestore
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setCurrentUser({
            id: userId,
            email: userData.email,
            name: userData.name,
          }); // Update UserContext
        }
        navigate("/home");
      }
    } catch (error) {
      alert(`Failed: ${error.message}`);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      // Save user to Firestore if new
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await saveUserToFirestore(user.uid, user.displayName, user.email);
      }

      setCurrentUser({
        id: user.uid,
        email: user.email,
        name: user.displayName,
      }); // Update UserContext
      navigate("/home");
    } catch (error) {
      alert(`Google sign-in failed: ${error.message}`);
    }
  };

  const saveUserToFirestore = async (uid, name, email) => {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, { name, email });
  };

  const styles = {
    authContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(to right, #4f5d75, #ef8354)",
      fontFamily: "'Roboto', sans-serif",
      color: "#333",
    },
    authCard: {
      background: "#fff",
      borderRadius: "10px",
      padding: "2rem",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
      textAlign: "center",
      maxWidth: "400px",
      width: "90%",
    },
    logo: {
      width: "300px",
      marginBottom: "1rem",
    },
    authForm: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    inputWrapper: {
      position: "relative",
      width: "100%",
    },
    input: {
      width: "100%",
      padding: "0.75rem 0",
      paddingLeft: "2.5rem",
      border: "1px solid #ddd",
      borderRadius: "8px",
      fontSize: "1rem",
      background:
        "linear-gradient(to right, rgba(79, 93, 117, 0.2), rgba(239, 131, 84, 0.2))",
      color: "#333",
      transition: "all 0.3s ease",
      boxSizing: "border-box",
    },
    inputIcon: {
      position: "absolute",
      left: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "1.25rem",
      color: "#888",
    },
    eyeIcon: {
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      fontSize: "1.25rem",
      color: "#888",
    },
    btn: {
      width: "100%",
      padding: "0.75rem",
      fontSize: "1rem",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "all 0.3s ease",
      background: "#4f5d75",
      color: "#fff",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    },
    btnHover: {
      boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
      background: "#ef8354",
      color: "#4f5d75",
    },
    googleBtn: {
      width: "100%",
      padding: "0.75rem",
      fontSize: "1rem",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "all 0.3s ease",
      background: "#4285F4",
      color: "#fff",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
    },
    googleBtnHover: {
      background: "#fff",
      color: "#4285F4",
      boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
    },
    separator: {
      textAlign: "center",
      fontSize: "0.9rem",
      color: "#999",
      margin: "1rem 0",
    },
    toggleText: {
      fontSize: "0.9rem",
    },
    toggleLink: {
      color: "#ef8354",
      cursor: "pointer",
      textDecoration: "underline",
    },
  };

  return (
    <div style={styles.authContainer}>
      <div style={styles.authCard}>
        <h1>Welcome to</h1>
        <img
          src="/images/convonext-high-resolution-logo-transparent.png"
          alt="ConvoNext Logo"
          style={styles.logo}
        />
        <form style={styles.authForm} onSubmit={handleEmailAuth}>
          {isSignUp && (
            <div style={styles.inputWrapper}>
              <FontAwesomeIcon icon={faUser} style={styles.inputIcon} />
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>
          )}
          <div style={styles.inputWrapper}>
            <FontAwesomeIcon icon={faEnvelope} style={styles.inputIcon} />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputWrapper}>
            <FontAwesomeIcon icon={faLock} style={styles.inputIcon} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              style={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          {isSignUp && (
            <div style={styles.inputWrapper}>
              <FontAwesomeIcon icon={faLock} style={styles.inputIcon} />
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                style={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          )}
          <button
            type="submit"
            style={{ ...styles.btn }}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.btnHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, styles.btn)}
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>
        <div style={styles.separator}>OR</div>
        <button
          onClick={handleGoogleSignIn}
          style={{ ...styles.googleBtn }}
          onMouseEnter={(e) =>
            Object.assign(e.target.style, styles.googleBtnHover)
          }
          onMouseLeave={(e) => Object.assign(e.target.style, styles.googleBtn)}
        >
          <FontAwesomeIcon
            icon={faGoogle}
            style={{ marginRight: "10px", color: "#fff", fontSize: "1.25rem" }}
          />
          Sign In with Google
        </button>
        <p style={styles.toggleText}>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            style={styles.toggleLink}
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Log in" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthSignInSignOut;
