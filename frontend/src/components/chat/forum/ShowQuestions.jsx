import React, {useState,useEffect} from 'react';
import QuestionsApi from '../../../api/QuestionsApi';
import UserApi from "../../../api/UserApi";
import CommentsApi from "../../../api/CommentsApi";
import CommentForm from "./CommentForm";
import ShowComments from "./ShowComments"
import { RiDeleteBin7Line, RiQuestionAnswerLine } from 'react-icons/ri';

//Function
function ShowQuestions({question}) {
 
   
    const [formState, setFormState] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
    const [comments, setComments] = useState([]);


   //Delete method
   const handleDelete = (question) => {
    QuestionsApi.deleteQuestion(question.id)
       .then(() => window.location.reload())
}

   /* const getComments = ({id}) => {
        //console.log("inside get comments " + id)
        CommentsApi.getCommentByQuestionId(id)
        .then(res => {
          //  console.log(res.data)
            setComments(res.data)
        })
    } */

    const getEmailOfUser = () => {
        UserApi.getCurrentUser()
            .then(response => {
                setCurrentUser(response.data.email);
            })
    }

    useEffect(() => {
        getEmailOfUser();
       // getComments();
    }, []);

    const toggle = () => {
        setFormState(!formState);
      }

      const createComment = (commentData) => {
            CommentsApi.createComment(commentData)
         .then(() => window.location.reload());
         };


    return (
        <div>
            <div className="question-card">
             { currentUser === question.email ?
            <button className="question-button"
                    onClick={() => handleDelete(question)}>
                    <RiDeleteBin7Line/>
                </button>
                : null }
                <button className="question-button"
                    onClick={toggle}>
                    <RiQuestionAnswerLine/>
                </button>
                <div>
                <p>{question.textBody}</p></div>
            </div>
            <div className="question-card">
            {formState ? (<ShowComments
            user={currentUser}
            question={question}/>) : null}
            {formState ? (
                    <CommentForm
                    changeFormState={toggle}
                    onSubmit={createComment}
                    question={question}

                     />
                    ) : null}
                    </div>

        
        </div>



    );
}

export default ShowQuestions;