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
        console.log(res.data);
    }

    const userLogin = async () => {
        setLoading(true)
        try {
            const res = await axios.post("/api/user/signin", { email, password })
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
        },
        {
            name: "Tesla",
            driver: "John Doe",
            cost: "10$",
        },
        {
            name: "Mercedes",
            driver: "Jane Smith",
            cost: "8$",
        },
        {
            name: "Audi",
            driver: "Alice Brown",
            cost: "6$",
        },
        {
            name: "Toyota",
            driver: "Bob Johnson",
            cost: "4$",
        },
        {
            name: "Honda",
            driver: "Charlie Davis",
            cost: "4.5$",
        },
        {
            name: "Nissan",
            driver: "Derek Fisher",
            cost: "5.5$",
        },
        {
            name: "Hyundai",
            driver: "Emily Green",
            cost: "6$",
        },
        {
            name: "Chevrolet",
            driver: "Frank Harris",
            cost: "7$",
        },
        {
            name: "Kia",
            driver: "Grace Lee",
            cost: "5$",
        },
        {
            name: "Subaru",
            driver: "Henry Black",
            cost: "6.5$",
        },
        {
            name: "Mazda",
            driver: "Isabel White",
            cost: "5.8$",
        },
        {
            name: "Volkswagen",
            driver: "Jack Brown",
            cost: "7.2$",
        },
        {
            name: "Volvo",
            driver: "Kelly Blue",
            cost: "8.1$",
        },
        {
            name: "Jaguar",
            driver: "Larry Green",
            cost: "9$",
        },
        {
            name: "Porsche",
            driver: "Megan Grey",
            cost: "12$",
        },
        {
            name: "Lexus",
            driver: "Nate Silver",
            cost: "10$",
        },
        {
            name: "Infiniti",
            driver: "Olivia Gold",
            cost: "9.5$",
        },
        {
            name: "Acura",
            driver: "Paul Red",
            cost: "8.5$",
        },
        {
            name: "Lincoln",
            driver: "Quincy Purple",
            cost: "7.5$",
        },
        {
            name: "Mitsubishi",
            driver: "Rachel Pink",
            cost: "4.8$",
        },
        {
            name: "Fiat",
            driver: "Sam Orange",
            cost: "4.2$",
        },
        {
            name: "Alfa Romeo",
            driver: "Tina Violet",
            cost: "8.7$",
        },
        {
            name: "Peugeot",
            driver: "Uma Indigo",
            cost: "6.3$",
        },
        {
            name: "Citroen",
            driver: "Victor Magenta",
            cost: "5.9$",
        },
        {
            name: "Renault",
            driver: "Wendy Cyan",
            cost: "5.7$",
        },
        {
            name: "Skoda",
            driver: "Xavier Lime",
            cost: "5.3$",
        },
        {
            name: "Seat",
            driver: "Yvonne Olive",
            cost: "5.0$",
        },
        {
            name: "Suzuki",
            driver: "Zack Coral",
            cost: "4.9$",
        },
        {
            name: "Mini",
            driver: "Amy Peach",
            cost: "7.8$",
        },
        {
            name: "Genesis",
            driver: "Brian Ash",
            cost: "8.4$",
        },
        {
            name: "Bugatti",
            driver: "Cathy Plum",
            cost: "15$",
        },
        {
            name: "McLaren",
            driver: "Dylan Moss",
            cost: "14$",
        },
        {
            name: "Rolls-Royce",
            driver: "Elena Frost",
            cost: "20$",
        },
        {
            name: "Bentley",
            driver: "Felix Stone",
            cost: "18$",
        },
        {
            name: "Aston Martin",
            driver: "Gina Marble",
            cost: "16$",
        },
        {
            name: "Land Rover",
            driver: "Harvey River",
            cost: "12$",
        },
        {
            name: "Maserati",
            driver: "Ivy Cloud",
            cost: "11$",
        },
        {
            name: "Dodge",
            driver: "Jasper Stream",
            cost: "7.4$",
        },
        {
            name: "Jeep",
            driver: "Karen Hill",
            cost: "7.1$",
        },
        {
            name: "Ram",
            driver: "Leo Bridge",
            cost: "6.8$",
        },
        {
            name: "GMC",
            driver: "Molly Field",
            cost: "7.3$",
        },
        {
            name: "Buick",
            driver: "Nora Cliff",
            cost: "6.2$",
        },
        {
            name: "Cadillac",
            driver: "Owen Valley",
            cost: "8.8$",
        },
        {
            name: "Chrysler",
            driver: "Paula Shore",
            cost: "5.6$",
        },
        {
            name: "Saab",
            driver: "Quentin Peak",
            cost: "6.0$",
        },
        {
            name: "Opel",
            driver: "Rita Grove",
            cost: "5.4$",
        },
        {
            name: "Smart",
            driver: "Steve Cross",
            cost: "4.7$",
        },
        {
            name: "Lancia",
            driver: "Terry Meadow",
            cost: "6.6$",
        },
        {
            name: "Hummer",
            driver: "Uma Crest",
            cost: "9.2$",
        },
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
            carDetails,
            loading, setLoading
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

