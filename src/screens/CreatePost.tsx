import AuthGuard from "../components/auth/AuthGuard";
import PostPageComponent from "../components/post/PostPageComponent";

const CreatePost = () => {
  return (
    <AuthGuard>
      <PostPageComponent />
    </AuthGuard>
  );
};

export default CreatePost;
