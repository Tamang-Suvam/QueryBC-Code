// function Link({ uri, text }) {
//   return <a className="fs-3 text-center" href={uri} target="_blank" rel="noreferrer">{text}</a>;
// }

function Footer() {
  return (
    <footer className="footer fixed-bottom">
      <div className="text-center p-3 bg-dark text-light fs-2">
        &copy; 2022 Copyright 
        <a className="text-white fs-3" href="https://www.sssihl.edu.in/" target={'_blank'} rel="noreferrer"> sssihl@edu.in </a>
      </div>
    </footer >
  );
}

export default Footer;
