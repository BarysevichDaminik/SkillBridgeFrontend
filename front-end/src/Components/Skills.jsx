import { useState, useEffect, useRef } from "react";

function Skills() {
    const [mySkills, setMySkills] = useState([]);
    const [allSkills, setAllSkills] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const mySkillsRef = useRef(null); // Реф для секции "Мои скилы"

    useEffect(() => {
        const fetchSkills = async () => {
            const host = window.location.hostname;

            await fetch(`https://${host}:7186/Auth/authWithToken`, {
                method: "POST",
                credentials: "include",
            });

            setIsAuthenticated(true);

            try {
                await fetchMySkills();
            } catch (error) {}

            try {
                const allSkillsResponse = await fetch(`https://${host}:7186/MainPage/getAllSkills`, {
                    method: "GET",
                    credentials: "include",
                });

                const allSkillsData = await allSkillsResponse.json();
                setAllSkills(allSkillsData);
            } catch (error) {}
        };

        fetchSkills();
    }, []);

    const fetchMySkills = async () => {
        const host = window.location.hostname;

        try {
            const response = await fetch(`https://${host}:7186/MainPage/getMySkills`, {
                method: "GET",
                credentials: "include",
            });

            const updatedSkills = await response.json();
            setMySkills(updatedSkills);
        } catch (error) {}
    };

    const handleSkillAction = async (skillId, skillType) => {
        const host = window.location.hostname;

        await fetch(`https://${host}:7186/MainPage/changeSkill`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ skillId, skillType }),
        });

        fetchMySkills();
        scrollToMySkills();
    };

    const scrollToMySkills = () => {
        mySkillsRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    if (!isAuthenticated) {
        return <p>Аутентификация не выполнена. Пожалуйста, обновите страницу.</p>;
    }

    const ownSkill = mySkills.find((skill) => skill.skillType === "own");
    const exploreSkill = mySkills.find((skill) => skill.skillType === "explore");

    return (
        <div className="container">
            <div ref={mySkillsRef} className="row mb-5">
                <div className="col-5 p-3 border-0 shadow bg-white text-center rounded-4 coats-font">
                    <strong className="fs-4">{ownSkill?.skillName}</strong>
                    <p className="text-info fs-5">Текущий навык, которым вы владеете</p>
                </div>
                <div className="col-5 p-3 border-0 shadow bg-white text-center rounded-4 coats-font ms-auto">
                    <strong className="fs-4">{exploreSkill?.skillName}</strong>
                    <p className="text-success fs-5">Навык, которому вы хотите научиться</p>
                </div>
            </div>

            <div className="row">
                {allSkills.map((skill, index) => (
                    <div
                        key={index}
                        className="col-12 mb-3 p-3 d-flex align-items-center border-0 shadow bg-white rounded-4 coats-font"
                    >
                        <button
                            className="btn btn-info me-3 text-white shadow"
                            onClick={() => handleSkillAction(skill.skillId, "own")}
                        >
                            Умею
                        </button>
                        <button
                            className="btn btn-success me-3 text-white shadow"
                            onClick={() => handleSkillAction(skill.skillId, "explore")}
                        >
                            Учить
                        </button>

                        <div className="flex-grow-1">
                            <strong>{skill.skillName}</strong>
                            <span className="text-muted"> — {skill.category}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Skills;