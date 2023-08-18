import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { styled } from "styled-components/native";
import { category } from "../../data/mockdata";
import { Text, TouchableOpacity } from "react-native";
import { useGetDiariesByCategory } from "../hooks/usePostQuery";
import { useGetCurrentUser } from "../hooks/useUserQuery";

import Profile from "../components/user/profile/Profile";
import Category from "../components/user/Category";
import DiaryList from "../components/user/DiaryList";
import UserPageSkeletonUI from "../components/user/UserPageSkeletonUI";
import { UserPageLayout } from "./UserPage";

const MyPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체보기");

  const navigation = useNavigation();

  const currentUser = useGetCurrentUser();
  const nickname = currentUser.data?.nickname ?? "";
  const diaries = useGetDiariesByCategory(nickname, selectedCategory) ?? [];

  if (currentUser.isLoading) {
    return <UserPageSkeletonUI />;
  }
  if (currentUser.isError) {
    return <UserPageSkeletonUI />;
  }

  return (
    <MyPageLayout>
      <Profile
        variant={"myPage"}
        user={currentUser.data}
        onPress={() => navigation.navigate("EditProfilePage" as never)}
      />

      <Category
        category={category}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* <DiaryList diaries={diaries.data} /> */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "UserPage" as never,
            {
              nickname: "asdf",
            } as never
          )
        }
      >
        <Text>유저버튼</Text>
      </TouchableOpacity>
    </MyPageLayout>
  );
};

const MyPageLayout = styled(UserPageLayout)``;

export default MyPage;
