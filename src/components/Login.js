import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 Hook
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";

const Login = () => {
    const navigate = useNavigate(); // useNavigate 훅 사용
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="bg-white flex flex-row justify-center w-full min-h-screen">
            <div className="bg-white w-full max-w-[1440px] relative py-[30px] px-[42px]">
                <div className="font-semibold text-black text-xl">Your Logo</div>
                
                <div className="flex flex-row mt-[29px] px-[69px]">
                    {/* Login Form */}
                    <Card className="w-[505px] h-[757px] rounded-[10px] border-[0.5px] border-solid border-[#868686] shadow-lg">
                        <CardContent className="p-[35px]">
                            <div className="font-light text-black text-[25px]">
                                Welcome !
                            </div>

                            <div className="mt-[68px]">
                                <div className="font-medium text-black text-[31px]">
                                    Sign in to
                                </div>
                                <div className="text-black text-base mt-3">
                                    회의 요약 및 투두리스트 사이트
                                </div>
                            </div>

                            <div className="mt-[48px]">
                                <div className="font-normal text-black text-base mb-2">
                                    Email
                                </div>
                                <Input
                                className="h-[59px] text-sm font-light"
                                placeholder="Enter your user Email"/> 
                            </div>

                            <div className="mt-[38px]">
                                <div className="text-black text-base mb-2">
                                    Password
                                </div>
                                <div className="relative">
                                    <Input
                                    type={showPassword ? "text" : "password"}
                                    className="h-[59px] text-sm font-light"
                                    placeholder="Enter your Password"/> 
                                    <button
                                    className="absolute right-[28px] top[1/2 transform-translate-y-1/2"
                                    onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? (
                                            <EyeOffIcon className="absolute right-0.5 top-7 -translate-y-1/2 w-[21px] h-[21px] text-gray-500" />
                                        ) : (
                                            <EyeIcon className="absolute right-0.5 top-7 -translate-y-1/2 w-[21px] h-[21px] text-gray-500" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <Button className="mt-[79px] h-[57px] w-full bg-[#f7b3b3] text-white rounded-md hover:bg-[#f7b3b3]/90 text-base font-medium"
                            onClick={() => {
                            navigate("/main")}}>
                                Login
                            </Button>


                            <div className="flex justify-center gap-2 mt-[55px]">
                                <span className="font-light text-[#7d7d7d] text-base">
                                    Don't have an Account?
                                </span>
                                <button className="font-semibold text-[#7d7d7d] text-base"
                                onClick={() => {navigate("/signup")}} // 클릭 시 SignUp 페이지로 이동
                                >
                                    Register
                                </button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Right side image */}
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

export default Login;