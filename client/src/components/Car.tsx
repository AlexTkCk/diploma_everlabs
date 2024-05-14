import React from 'react';


const BackWheel = (props: {className: string}) => {
    return <pre className={props.className}>
        {
        `
    &&%&%%%%&
  &&&&     &&%%&
&&&&  (((((& &&%%
&&&  %#(((((  &&%
&&&   %%%#(&  %&&
  &&&&     &&&&&
    &&&&&&&&&
        `
        }

    </pre>
}

const FrontWheel = (props: {className: string}) => {
    return <pre className={props.className}>
        {
            `
     &&%&%%%%
  &&&&&    &&&%%
 &&&  ((((((  &&%
&&&  %%(((((( &&%&
 &&&  %%%%((  &%&
  &&&&      &&&&
    &&&&&&&&
        `
        }
    </pre>
}

const Car = ({speed, children=<></>}: {speed: number, children?: React.ReactNode}) => {
    return (
        <pre className={'relative text-white text-[5px] relative w-fit'}>
            {children}
            {
            `                                   
                     #((#%--------------------------##((%
             #(((      &%%%%%%(((# &&& %((((%%%%%%%%&     ((
    &/////////////////(&   //(%     && %(((((((%%%%%%%%%%%&   ((
         ((((((((((((((((((((((((/////#%                         &(#
    &/%%  ((((((((((((((((((((((((((#      %#(((((((((((((((((((((((///////////////#&
    &/%%%  ((((#     %(((((((((%    %%%%%%%%%%%&           &##((((((((((((((((#&    &#(((((
    &/%  &(&              ((((((%  %%%%((((((((((((###%%%%%%%%%%     &((((#              (((((#
  (((((((&                  ((((((%  %%%%#((((((((((((((((((((((((((((((#                  ((&
  ((((((&                    (((((((%    &&&&%%%%%%%%%%%%%%%##((((((((((                    (((((
  %(((((                     (((((((((((((((((((((#%%&&&              (%                    #(((
    %%%%                     %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                    %%%%
    
    
            `
        }
            <BackWheel className={`absolute bottom-0 left-8 ${speed > 0 ? 'animate-spin' : ''}`}/>
            <FrontWheel className={`absolute bottom-0 right-5 ${speed > 0 ? 'animate-spin' : ''}`}/>
        </pre>
    );
};

export default Car;