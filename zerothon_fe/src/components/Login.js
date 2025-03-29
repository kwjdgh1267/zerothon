import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
      id: '',
      password: ''
    });
    const [errorMessage, setErrorMessage] = useState("");
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleLogin = async () => {
      try {
        const response = await fetch("http://localhost:8080/sign-in", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // 필요 시
          body: JSON.stringify(form),
        });
  
        if (!response.ok) {
          throw new Error("로그인 요청 실패");
        }
  
        const contentType = response.headers.get("content-type");
        let data = null;
  
        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        } else {
          data = {};
        }
  
        if (!data.accessToken) {
          throw new Error("로그인 실패: 토큰이 없습니다.");
        }
  
        localStorage.setItem("token", data.accessToken);
        navigate("/main");
      } catch (err) {
        setErrorMessage(err.message);
        console.error("로그인 오류:", err.message);
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
                                    name="id"
                                    className="h-[59px] text-sm font-light"
                                    placeholder="Enter your user Email"
                                    value={form.id}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mt-[38px]">
                                <div className="text-black text-base mb-2">Password</div>
                                <div className="relative">
                                    <Input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        className="h-[59px] text-sm font-light"
                                        placeholder="Enter your Password"
                                        value={form.password}
                                        onChange={handleChange}
                                    />
                                    <button
                                        className="absolute right-[28px] top-[50%] transform -translate-y-1/2"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOffIcon className="absolute right-0.5 top-1 -translate-y-1/2 w-[21px] h-[21px] text-gray-500" />
                                        ) : (
                                            <EyeIcon className="absolute right-0.5 top-1 -translate-y-1/2 w-[21px] h-[21px] text-gray-500" />
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

                            {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
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
};

export default Login;