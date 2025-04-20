import React from 'react'

export default function Title(props) { //因為每次使用title會收到一個props obj, 所以()直接填props
  return (
    <div>
        <h1 style={{backgroundColor:'orange', borderBottom : '5px solid red', textAlign: 'center'}}>
            {props.mainTitle} {/*將原本固定文字轉換為相應文字*/}
            {props.subTitle}

        </h1>
    </div>
  )
}
