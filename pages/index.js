import { useRef, useState } from "react";

const Home = () => {
    const imageRef = useRef(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState([]);

    const startModel = async () => {
        setIsLoading(true);

        const ml5 = await import("ml5");
        const classifier = await ml5.imageClassifier("MobileNet");
        const results = await classifier.classify(imageRef.current);
        setResults(results);

        setIsLoading(false);
    };

    const onFileChange = (e) => {
        const file = e.target.files[0];
        const fileUrl = URL.createObjectURL(file);
        setImageUrl(fileUrl);
    };

    return (
        <div className="w-full h-full flex items-center justify-center container mx-auto">
            <div className="flex flex-col bg-gray-700 p-8 rounded-3xl shadow-lg shadow-gray-700">
                <input type="file" onChange={onFileChange} />
                {imageUrl && (
                    <img
                        ref={imageRef}
                        src={imageUrl}
                        className="object-contain h-[500px]"
                        alt="Image preview"
                    />
                )}
                {imageUrl && (
                    <button
                        className="bg-green-500 text-xl p-2"
                        onClick={startModel}
                    >
                        Start
                    </button>
                )}
                {isLoading && <div>Loading...</div>}

                {results.length > 0 && (
                    <table class="table-auto mt-8">
                        <thead>
                            <tr>
                                <th>Label</th>
                                <th>Confidence</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result) => (
                                <tr>
                                    <td>{result.label}</td>
                                    <td>
                                        {(result.confidence * 100).toFixed(1)}%
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Home;
