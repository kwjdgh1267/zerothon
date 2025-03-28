import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 Hook
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";


const SignUp = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [showPassword, setShowPassword] = useState(false); // 추가
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 추가

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };


  return (
    <div className="bg-white flex flex-row justify-center w-full min-h-screen">
      <div className="bg-white w-full max-w-[1440px] relative py-[30px] px-[42px]">
        <div className="font-semibold text-black text-xl">WSC</div>

        <div className="flex flex-row mt-[29px] px-[69px]">
          <Card className="w-[505px] h-[757px] rounded-[10px] border-[0.5px] border-solid border-[#868686] shadow-lg">
            <CardContent className="pt-[10px] px-[35px] pb-[35px]">
              <div className="font-light text-black text-[25px] mt-[10px]">Welcome!</div>

              <div className="mt-[15px]">
                <div className="font-medium text-black text-[31px] leading-normal">
                  Sign up to
                </div>
                <div className="text-black text-base mt-2">회의 요약 및 투두리스트 사이트</div>
              </div>

              <div className="mt-[30px]">
                <div>
                  <label className="font-normal text-black text-base leading-normal block mb-[8px]">
                    Email
                  </label>
                  <Input
                    placeholder="Enter your email"
                    className="h-[59px] rounded-md border-[0.6px] border-solid border-[#282828] px-[16px] py-[17px] font-light text-[#ababab] text-sm mb-[25px]"
                  />
                </div>

                <div>
                  <label className="font-normal text-black text-base leading-normal block mb-[8px]">
                    User name
                  </label>
                  <Input
                    placeholder="Enter your user name"
                    className="h-[59px] rounded-md border-[0.6px] border-solid border-[#282828] px-[16px] py-[17px] font-light text-[#ababab] text-sm mb-[25px]"
                  />
                </div>

                <div>
                  <label className="font-normal text-black text-base leading-normal block mb-[8px]">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your Password"
                      className="h-[59px] rounded-md border-[0.6px] border-solid border-[#282828] px-[16px] py-[17px] font-light text-[#ababab] text-sm mb-[25px]"
                    />
                    <button
                      className="absolute right-[28px] py-[18px]"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeIcon className="w-[21px] h-[21px]" />
                      ) : (
                        <EyeOffIcon className="w-[21px] h-[21px]" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="font-normal text-black text-base leading-normal block mb-[8px]">
                    Confrim Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confrim your Password"
                      className="h-[59px] rounded-md border-[0.6px] border-solid border-[#282828] px-[16px] py-[17px] font-light text-[#ababab] text-sm mb-[25px]"
                    />
                    <button
                      className="absolute right-[28px] py-[18px]"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? (
                        <EyeIcon className="w-[21px] h-[21px]" />
                      ) : (
                        <EyeOffIcon className="w-[21px] h-[21px]" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <Button className="w-full h-[57px] bg-[#f7b3b3] text-white rounded-md hover:bg-[#f7b3b3]/90 text-base font-medium"
              onClick={() => navigate("/")}>
                Register
              </Button>

              <div className="flex justify-center mt-[8px]">
                <span className="font-light text-[#7d7d7d] text-base">
                  Already have an Account?
                </span>
                <button
                  className="font-semibold text-[#7d7d7d] text-base ml-2"
                  onClick={() => navigate("/")} // 클릭 시 로그인 페이지로 이동
                >
                  Login
                </button>
              </div>
            </CardContent>
          </Card>

          <div className="flex-1 ml-9 flex items-center justify-center">
            <img
              src="login.png"
              alt="Meeting notes visual"
              className="w-full max-w-[500px] h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
