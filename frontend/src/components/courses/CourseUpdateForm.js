import React, { useState } from 'react'

export default function CourseUpdateForm( {oldCourse, changeFormState, onCourseUpdate, onCancelUpdate}) {
    const [title,       setTitle]       = useState(oldCourse.title);
    const [description, setDescription] = useState(oldCourse.description);
    const {id, createDate} = oldCourse;

    const handleUpdateCourseClick = (e) => {
        const updatedCourse = { id, description, title, createDate };

        console.log('in from upd ', updatedCourse);
        onCourseUpdate(updatedCourse);
        changeFormState(false);
      };
        return (
          <div className="couseupdate"> 
            <form>
            <div className="form-group">
                 <label>Title Name    : <span>(12 char)</span> </label>
                  
                  <input name="title" type="text" maxlength="12"
                       value={title} 
                       onChange={e=> setTitle(e.target.value)}/>       
             </div>
            
             <div className="form-group">
                  <label>Description : </label>
                  <textarea name="description" type="text"
                        value={description}
                        onChange={e=> setDescription(e.target.value)}
                        />
                        <div className="form-group"> 
                        <button className="btn btn-primary" type="button" onClick={handleUpdateCourseClick} > 
                        Update  </button>
                        <button className="btn btn-outline" type="button" onClick={onCancelUpdate}> Cancel </button>
                        </div>
                </div>
           </form>
          </div>
          );
      }