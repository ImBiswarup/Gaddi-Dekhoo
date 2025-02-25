'use client'

import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
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
            imageUrl: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
            name: "Tesla",
            driver: "John Doe",
            cost: "10$",
            imageUrl: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
            name: "Mercedes",
            driver: "Jane Smith",
            cost: "8$",
            imageUrl: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
            name: "Audi",
            driver: "Alice Brown",
            cost: "6$",
            imageUrl: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
            name: "Toyota",
            driver: "Bob Johnson",
            cost: "4$",
            imageUrl: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
            name: "Honda",
            driver: "Charlie Davis",
            cost: "4.5$",
            imageUrl: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
            name: "Nissan",
            driver: "Derek Fisher",
            cost: "5.5$",
            imageUrl: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
            name: "Hyundai",
            driver: "Emily Green",
            cost: "6$",
            imageUrl: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
            name: "Chevrolet",
            driver: "Frank Harris",
            cost: "7$",
            imageUrl: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
            name: "Kia",
            driver: "Grace Lee",
            cost: "5$",
            imageUrl: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        }
    ];
    
    const allRider = [
        {
            "riderName": "Alice",
            "carName": "BMW",
            "imageUrl": "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
            "riderName": "Bob",
            "carName": "Tesla",
            "imageUrl": "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
            "riderName": "Charlie",
            "carName": "Mercedes",
            "imageUrl": "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
            "riderName": "David",
            "carName": "Audi",
            "imageUrl": "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
            "riderName": "Eve",
            "carName": "Lexus",
            "imageUrl": "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
            "riderName": "Frank",
            "carName": "Honda",
            "imageUrl": "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
            "riderName": "Grace",
            "carName": "Toyota",
            "imageUrl": "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
            "riderName": "Heidi",
            "carName": "Ford",
            "imageUrl": "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
            "riderName": "Ivan",
            "carName": "Chevrolet",
            "imageUrl": "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
            "riderName": "Judy",
            "carName": "Volkswagen",
            "imageUrl": "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
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

