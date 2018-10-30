// import {spring} from "react-router-transition";
//
// export const rule = css`
//   padding-top: 5rem;
//   box-sizing: border-box;
//   background-color: #fff;
//   color: #333;
// `;
//
// export const switchRule = css`
//   position: relative;
//   height: calc("100vh - 50px");
//   width: 100vw;
//   background-color: #fff;
//   & > div {
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     overflow-y: auto;
//     -webkit-overflow-scrolling: touch;
//   }
// `;
//
// export const pageTransitions = {
//   atEnter: {
//     offset: 200,
//     opacity: 0,
//   },
//   atLeave: {
//     offset: glide(-100),
//     opacity: glide(0),
//   },
//   atActive: {
//     offset: glide(0),
//     opacity: glide(1),
//   },
// };
//
// export function glide(val) {
//   return spring(val, {
//     stiffness: 174,
//     damping: 19,
//   });
// }
//
// export function mapStyles(styles) {
//   return {
//     opacity: styles.opacity,
//     transform: `translateX(${styles.offset}px)`,
//   };
// }