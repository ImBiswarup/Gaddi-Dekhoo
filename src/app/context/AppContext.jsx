'use client'

import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { redirect } from "next/dist/server/api-utils";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

const AppContext = createContext();
export const AppProvider = ({ children }) => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('Customer')
    const [user, setUser] = useState([])
    const [distance, setDistance] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [loading, setLoading] = useState(false);

    const router = useRouter()

    const userSignup = async () => {
        const res = await axios.post('/api/user/signup', {
            name: userName,
            email, password, role
        })
        setUser(res.data)
        router.push('/u/signin')
        console.log(res.data);
    }

    const userLogin = async () => {
        setLoading(true)
        try {
            const res = await axios.post("/api/user/signin", { email, password })

            console.log(res.data.token);
            if (res.data?.status === true) {
                console.log("Login successful:", res.data)
                setUser(res.data?.user)
                alert("Login successful")
                // router.push(`/profile/${res.data?.user?.name}`)
                router.push('/')
            } else {
                console.log("Login failed:", res.data)
                alert("Login failed. Please check your credentials.")
            }
        } catch (err) {
            console.error("Login error:", err)
            alert("An error occurred. Please try again later.")
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        const token = document.cookie
            .split("; ")
            .find(row => row.startsWith("token="))
            ?.split("=")[1];

        if (token) {
            const decodedUser = jwtDecode(token);
            setUser(decodedUser);
        }
    }, []);

    const carDetails = [
        {
            name: "BMW",
            driver: "Test Driver",
            cost: "5$",
            imageUrl: "https://res.cloudinary.com/djrdw0sqz/image/upload/v1725100842/myImg_q3lyty.jpg"
        },
        {
            name: "Tesla",
            driver: "John Doe",
            cost: "10$",
            imageUrl: "https://res.cloudinary.com/djrdw0sqz/image/upload/v1725100842/myImg_q3lyty.jpg"
        },
        {
            name: "Mercedes",
            driver: "Jane Smith",
            cost: "8$",
            imageUrl: "https://res.cloudinary.com/djrdw0sqz/image/upload/v1725100842/myImg_q3lyty.jpg"
        },
        {
            name: "Audi",
            driver: "Alice Brown",
            cost: "6$",
            imageUrl: "https://res.cloudinary.com/djrdw0sqz/image/upload/v1725100842/myImg_q3lyty.jpg"
        },
        {
            name: "Toyota",
            driver: "Bob Johnson",
            cost: "4$",
            imageUrl: "https://res.cloudinary.com/djrdw0sqz/image/upload/v1725100842/myImg_q3lyty.jpg"
        },
        {
            name: "Honda",
            driver: "Charlie Davis",
            cost: "4.5$",
            imageUrl: "https://res.cloudinary.com/djrdw0sqz/image/upload/v1725100842/myImg_q3lyty.jpg"
        },
        {
            name: "Nissan",
            driver: "Derek Fisher",
            cost: "5.5$",
            imageUrl: "https://res.cloudinary.com/djrdw0sqz/image/upload/v1725100842/myImg_q3lyty.jpg"
        },
        {
            name: "Hyundai",
            driver: "Emily Green",
            cost: "6$",
            imageUrl: "https://res.cloudinary.com/djrdw0sqz/image/upload/v1725100842/myImg_q3lyty.jpg"
        },
        {
            name: "Chevrolet",
            driver: "Frank Harris",
            cost: "7$",
            imageUrl: "https://res.cloudinary.com/djrdw0sqz/image/upload/v1725100842/myImg_q3lyty.jpg"
        },
        {
            name: "Kia",
            driver: "Grace Lee",
            cost: "5$",
            imageUrl: "https://res.cloudinary.com/djrdw0sqz/image/upload/v1725100842/myImg_q3lyty.jpg"
        }
    ];
    
    const allRider = [
        {
            "riderName": "Alice",
            "carName": "BMW",
            "imageUrl": "https://res.cloudinary.com/djrdw0sqz/image/upload/v1725100842/myImg_q3lyty.jpg"
        },
        {
            "riderName": "Bob",
            "carName": "Tesla",
            "imageUrl": "https://res.cloudinary.com/djrdw0sqz/image/upload/v1725100842/myImg_q3lyty.jpg"
        },
        {
            "riderName": "Charlie",
            "carName": "Mercedes",
            "imageUrl": "https://res.cloudinary.com/djrdw0sqz/image/upload/v1725100842/myImg_q3lyty.jpg"
        },
        {
            "riderName": "David",
            "carName": "Audi",
            "imageUrl": "https://res.cloudinary.com/djrdw0sqz/image/upload/v1725100842/myImg_q3lyty.jpg"
        },
        {
            "riderName": "Eve",
            "carName": "Lexus",
            "imageUrl": "https://res.cloudinary.com/djrdw0sqz/image/upload/v1725100842/myImg_q3lyty.jpg"
        },
        {
            "riderName": "Frank",
            "carName": "Honda",
            "imageUrl": "https://res.cloudinary.com/djrdw0sqz/image/upload/v1725100842/myImg_q3lyty.jpg"
        },
        {
            "riderName": "Grace",
            "carName": "Toyota",
            "imageUrl": "https://res.cloudinary.com/djrdw0sqz/image/upload/v1725100842/myImg_q3lyty.jpg"
        },
        {
            "riderName": "Heidi",
            "carName": "Ford",
            "imageUrl": "https://res.cloudinary.com/djrdw0sqz/image/upload/v1725100842/myImg_q3lyty.jpg"
        },
        {
            "riderName": "Ivan",
            "carName": "Chevrolet",
            "imageUrl": "https://res.cloudinary.com/djrdw0sqz/image/upload/v1725100842/myImg_q3lyty.jpg"
        },
        {
            "riderName": "Judy",
            "carName": "Volkswagen",
            "imageUrl": "https://res.cloudinary.com/djrdw0sqz/image/upload/v1725100842/myImg_q3lyty.jpg"
        }
    ];

    return (
        <AppContext.Provider value={{
            userName,
            setUserName,
            email, setEmail,
            password, setPassword,
            role, setRole,
            user, setUser,
            userLogin, userSignup,
            distance, setDistance,
            totalAmount, setTotalAmount,
            carDetails, allRider,
            loading, setLoading
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

