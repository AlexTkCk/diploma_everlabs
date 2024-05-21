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
            <span className={`absolute top-2 -left-10 transition ${speed ? 'animate-[speed_0.5s_ease-in-out_infinite]' : 'hidden'}`}>&%%%%%%(((#</span>
            <span className={`absolute top-1/2 -left-24 transition ${speed ? 'animate-[speed_1s_ease-in-out_infinite]' : 'hidden'}`}>&%%%%%%(((#&%%%%%%(((#</span>
            <span className={`absolute bottom-3 -left-14 transition ${speed ? 'animate-[speed_0.75s_ease-in-out_infinite]' : 'hidden'}`}>&%%%%%%(((#</span>
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