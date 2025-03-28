import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [id, setEmail] = useState("");  // 이메일 상태
    const [password, setPassword] = useState("");  // 비밀번호 상태
    const [errorMessage, setErrorMessage] = useState("");  // 에러 메시지 상태

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:8080/sign-in", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ id, password })
            });
        
            // 응답이 성공적이지 않을 경우 처리
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`로그인 요청에 실패했습니다: ${errorMessage}`);
            }
    
            // 응답이 없거나 비어있다면 예외 처리
            const data = await response.json();
            console.log(data)
            if (!data.accessToken) {
                throw new Error("로그인 실패: 토큰이 없습니다.");
            }
    
            // 로그인 성공 처리
            const token = data.accessToken;
            localStorage.setItem("token", token);
            navigate("/main");
        } catch (error) {
            setErrorMessage(error.message);
            console.error("로그인 오류:", error.message);
        }
    };
    
    

    return (
        <div className="bg-white flex flex-row justify-center w-full min-h-screen">
            <div className="bg-white w-full max-w-[1440px] relative py-[30px] px-[42px]">

                <div className="font-semibold text-black text-xl">WSC</div>
            
                <div className="flex flex-row mt-[29px] px-[69px]">
                    <Card className="w-[505px] h-[757px] rounded-[10px] border-[0.5px] border-solid border-[#868686] shadow-lg">
                        <CardContent className="p-[35px]">
                            <div className="font-light text-black text-[25px]">Welcome !</div>

                            <div className="mt-[68px]">
                                <div className="font-medium text-black text-[31px]">Sign in to</div>
                                <div className="text-black text-base mt-3">회의 요약 및 투두리스트 사이트</div>
                            </div>

                            <div className="mt-[48px]">
                                <div className="font-normal text-black text-base mb-2">Email</div>
                                <Input
                                    className="h-[59px] text-sm font-light"
                                    placeholder="Enter your user Email"
                                    value={id}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="mt-[38px]">
                                <div className="text-black text-base mb-2">Password</div>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        className="h-[59px] text-sm font-light"
                                        placeholder="Enter your Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        className="absolute right-[28px] top-[50%] transform -translate-y-1/2"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOffIcon className="absolute right-0.5 top-7 -translate-y-1/2 w-[21px] h-[21px] text-gray-500" />
                                        ) : (
                                            <EyeIcon className="absolute right-0.5 top-7 -translate-y-1/2 w-[21px] h-[21px] text-gray-500" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <Button
                                className="mt-[79px] h-[57px] w-full bg-[#f7b3b3] text-white rounded-md hover:bg-[#f7b3b3]/90 text-base font-medium"
                                onClick={handleLogin}
                            >
                                Login
                            </Button>

                            {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Login;
