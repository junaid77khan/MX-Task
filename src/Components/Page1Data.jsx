import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';

function Page1Data() {
    const location = useLocation();
    const [quizIndex, setQuizIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await fetch(`https://mxpertztestapi.onrender.com/api/sciencefiction/${location.state}`);
                let result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [location.state]);

    const handleQuizSubmit = () => {
        const correctAnswer = data?.Brainquest?.[quizIndex]?.Answer;
        setIsAnswerCorrect(selectedAnswer === correctAnswer);
    };

    const handleNextQuiz = () => {
        setQuizIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-t from-gray-800 to-cyan-700 text-white flex flex-col items-center">
            <Header />
            <div className="w-full max-w-5xl px-6 py-8">
                {data.Title && <h1 className="text-4xl font-extrabold text-center mb-10">{data.Title}</h1>}

                {data?.Image?.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-8 mb-10">
                        {data.Image.map((img, idx) => (
                            <img
                                key={idx}
                                className="h-96 w-96 object-cover rounded-xl shadow-xl transition-transform transform hover:scale-105"
                                src={`https://ik.imagekit.io/dev24/${img}`}
                                alt={`Image ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}

                {data?.Brainquest?.length > 0 && quizIndex < data.Brainquest.length && (
                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-10">
                        <h2 className="text-xl font-semibold mb-6">{data.Brainquest[quizIndex].Question}</h2>
                        <div className="flex flex-col gap-4">
                            {data.Brainquest[quizIndex].Option.map((option, idx) => (
                                <label
                                    key={idx}
                                    className={`cursor-pointer p-4 rounded-lg border text-center font-medium transition-colors ${
                                        selectedAnswer === option
                                            ? "bg-blue-600 border-blue-800 text-white"
                                            : "bg-gray-700 border-gray-600 hover:bg-gray-600"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="quiz"
                                        value={option}
                                        className="hidden"
                                        onChange={() => setSelectedAnswer(option)}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                        {isAnswerCorrect !== null && (
                            <p
                                className={`mt-4 text-lg font-bold text-center ${
                                    isAnswerCorrect ? "text-green-500" : "text-red-500"
                                }`}
                            >
                                {isAnswerCorrect ? "Correct Answer!" : "Wrong Answer!"}
                            </p>
                        )}
                        <div className="flex justify-between mt-6">
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
                                onClick={handleQuizSubmit}
                                disabled={!selectedAnswer}
                            >
                                Submit
                            </button>
                            {isAnswerCorrect !== null && quizIndex < data.Brainquest.length - 1 && (
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
                                    onClick={handleNextQuiz}
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {data?.Storyadvenure?.content?.map((story, idx) => (
                    <div
                        key={idx}
                        className="bg-gray-800 p-6 mb-10 rounded-xl shadow-lg w-full"
                    >
                        <h2 className="text-2xl font-semibold mb-5">
                            {data.Storyadvenure?.Storytitle || "Story Adventure"}
                        </h2>
                        <div className="flex flex-wrap gap-6 mb-5">
                            {story.Storyimage?.map((img, imgIdx) => (
                                <img
                                    key={imgIdx}
                                    className="h-48 w-64 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                                    src={`https://ik.imagekit.io/dev24/${img}`}
                                    alt={`Story Adventure Image ${imgIdx + 1}`}
                                />
                            ))}
                        </div>
                        {story.Paragraph?.map((para, paraIdx) => (
                            <p key={paraIdx} className="text-lg leading-relaxed text-justify mb-4">
                                {para}
                            </p>
                        ))}
                    </div>
                ))}

                {data?.Wordexplore?.length > 0 && (
                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-10">
                        <h2 className="text-2xl font-bold mb-6 text-center">Word Explore</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {data.Wordexplore.map((word, idx) => (
                                <div
                                    key={idx}
                                    className="p-5 bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <h3 className="text-lg font-bold mb-3">{word.Storytitle}</h3>
                                    <p className="text-sm text-gray-300 mb-2">
                                        <strong>Description:</strong> {word.Storyttext}
                                    </p>
                                    <p className="text-sm text-gray-300 mb-2">
                                        <strong>Synonyms:</strong> {word.Synonyms}
                                    </p>
                                    <p className="text-sm text-gray-300">
                                        <strong>Antonyms:</strong> {word.Antonyms || "N/A"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Page1Data;
