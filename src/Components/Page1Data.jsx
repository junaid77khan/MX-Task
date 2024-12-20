
// function Page1Data() {
//     const location = useLocation();
//     const[data, setData] = useState({});
//     let[image1, setImage1] = useState('');
//     let[image2, setImage2] = useState('');
//     useEffect(() => {
//         const fetchData = async () => {
//             let data = await fetch(`https://mxpertztestapi.onrender.com/api/sciencefiction/${location.state}`)
//             data = await data.json();
//             setData(data);
//             console.log(data);
//             setImage1(`https://ik.imagekit.io/dev24/${data?.Image[0]}`)
//             setImage2(`https://ik.imagekit.io/dev24/${data?.Image[1]}`)
//         }
//         fetchData();
//     }, [])

//     return (
//         <div className='min-h-screen bg-gradient-to-t from-gray-500 to-blue-500 text-white flex flex-col justify-start items-center'>
//             <Header/>
//             {data.length === 0 ? (
//                 <h1>Loading...</h1>
//             ) : (
//                 <div className='text-center'>
//                     <h1 className='text-2xl font-semibold mb-5'>{data.Title}</h1>
//                     <div className='flex flex-wrap justify-center items-center gap-5'>
//                         <img className='rounded-lg h-80 w-96' src={image1}/>
//                         <img className='rounded-lg h-80 w-96' src={image2}/>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default Page1Data


import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Header from './Header';

function Page1Data() {
    const location = useLocation();
    const [quizIndex, setQuizIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
    const[data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            let data = await fetch(`https://mxpertztestapi.onrender.com/api/sciencefiction/${location.state}`)
            data = await data.json();
            setData(data);
            console.log(data);
            setImage1(`https://ik.imagekit.io/dev24/${data?.Image[0]}`)
            setImage2(`https://ik.imagekit.io/dev24/${data?.Image[1]}`)
        }
        fetchData();
    }, [])

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
        <div className="min-h-screen bg-gradient-to-t from-gray-800 to-cyan-900 text-white flex flex-col items-center">
            <Header />
            <div className="w-full max-w-5xl px-4 py-8">
                {/* Title */}
                <h1 className="text-4xl font-bold text-center mb-8">{data.Title}</h1>

                {/* Images */}
                <div className="flex flex-wrap justify-center gap-6 mb-8">
                    {data?.Image?.map((img, idx) => (
                        <img
                            key={idx}
                            className="h-64 w-80 object-cover rounded-lg shadow-lg"
                            src={`https://ik.imagekit.io/dev24/${img}`}
                            alt={`Story image ${idx + 1}`}
                        />
                    ))}
                </div>

                {/* Quizzes */}
                {data?.Brainquest?.length > 0 && quizIndex < data.Brainquest.length && (
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-10">
                        <h2 className="text-xl font-semibold mb-4">
                            {data.Brainquest[quizIndex].Question}
                        </h2>
                        <div className="flex flex-col gap-3">
                            {data.Brainquest[quizIndex].Option.map((option, idx) => (
                                <label
                                    key={idx}
                                    className={`cursor-pointer p-3 rounded-lg border ${
                                        selectedAnswer === option
                                            ? "bg-blue-500 border-blue-700"
                                            : "bg-gray-700 hover:bg-gray-600"
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
                                className={`mt-3 font-bold ${
                                    isAnswerCorrect ? "text-green-400" : "text-red-400"
                                }`}
                            >
                                {isAnswerCorrect ? "Correct Answer!" : "Wrong Answer!"}
                            </p>
                        )}
                        <div className="flex justify-between mt-5">
                            <button
                                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
                                onClick={handleQuizSubmit}
                                disabled={!selectedAnswer}
                            >
                                Submit
                            </button>
                            {isAnswerCorrect !== null && quizIndex < data.Brainquest.length - 1 && (
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                                    onClick={handleNextQuiz}
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Story Adventure */}
                {data?.Storyadvenure?.content?.map((story, idx) => (
                    <div
                        key={idx}
                        className="bg-gray-800 p-6 mb-10 rounded-lg shadow-lg w-full"
                    >
                        <h2 className="text-2xl font-semibold mb-4">
                            {data.Storyadvenure?.Storytitle || "Story Adventure"}
                        </h2>
                        <div className="flex flex-wrap gap-5 mb-5">
                            {story.Storyimage?.map((img, imgIdx) => (
                                <img
                                    key={imgIdx}
                                    className="h-48 w-64 rounded-lg shadow-lg"
                                    src={`https://ik.imagekit.io/dev24/${img}`}
                                    alt={`Story Adventure ${imgIdx + 1}`}
                                />
                            ))}
                        </div>
                        {story.Paragraph?.map((para, paraIdx) => (
                            <p key={paraIdx} className="text-lg text-justify mb-3">
                                {para}
                            </p>
                        ))}
                    </div>
                ))}

                {/* Word Explore */}
                {data?.Wordexplore?.length > 0 && (
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-10">
                        <h2 className="text-2xl font-bold mb-5">Word Explore</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {data.Wordexplore.map((word, idx) => (
                                <div
                                    key={idx}
                                    className="p-4 bg-gray-700 rounded-lg shadow-md"
                                >
                                    <h3 className="text-lg font-bold mb-2">
                                        {word.Storytitle}
                                    </h3>
                                    <p className="text-sm text-gray-300 mb-1">
                                        <strong>Description:</strong> {word.Storyttext}
                                    </p>
                                    <p className="text-sm text-gray-300 mb-1">
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
