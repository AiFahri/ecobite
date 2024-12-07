import QuestionBg from "../../../assets/Frame 1000007112.png";
import AvatarGroup from "../../../assets/Avatar group.png";

const Question = () => {
    return (
        <section id="question">
            <div
                className="container max-w-screen-xl mx-auto text-center my-20 font-outfit bg-cover bg-center bg-no-repeat rounded-lg"
                style={{ backgroundImage: `url(${QuestionBg})` }}
            >
                <div className="p-10">
                    <img src={AvatarGroup} className="mx-auto" />
                    <p className="text-xl">Still have questions?</p>
                    <p className="text-sm">
                        Having trouble finding the answer you need? Reach out to
                        our friendly team for further help!
                    </p>
                    <button className="bg-[#A1E870] py-2 px-2 rounded-lg mt-6">
                        Get in touch
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Question;
