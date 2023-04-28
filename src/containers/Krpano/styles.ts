import styled from "styled-components";

export const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  align-self: center;
  justify-content: center;
  height: 100vh;
`;

export const ErrorText = styled.div`
  color: #cc0033;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 23px;
  font-weight: bold;
  line-height: 20px;
  text-shadow: 1px 1px rgba(250, 250, 250, 0.3);
`;

export const GlobalStyle = styled.div`
  font-family: system-ui, /* macOS 10.11-10.12 */ -apple-system,
    /* Windows 6+ */ "Segoe UI", /* Android 4+ */ "Roboto",
    /* Ubuntu 10.10+ */ "Ubuntu", /* Gnome 3+ */ "Cantarell",
    /* KDE Plasma 5+ */ "Noto Sans", /* fallback */ sans-serif,
    /* macOS emoji */ "Apple Color Emoji", /* Windows emoji */ "Segoe UI Emoji",
    /* Windows emoji */ "Segoe UI Symbol", /* Linux emoji */ "Noto Color Emoji" !important;

  & > * {
    font-family: system-ui, /* macOS 10.11-10.12 */ -apple-system,
      /* Windows 6+ */ "Segoe UI", /* Android 4+ */ "Roboto",
      /* Ubuntu 10.10+ */ "Ubuntu", /* Gnome 3+ */ "Cantarell",
      /* KDE Plasma 5+ */ "Noto Sans", /* fallback */ sans-serif,
      /* macOS emoji */ "Apple Color Emoji",
      /* Windows emoji */ "Segoe UI Emoji",
      /* Windows emoji */ "Segoe UI Symbol",
      /* Linux emoji */ "Noto Color Emoji" !important;
  }
`;

export const MaskWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const MaskBackground = styled.img`
  width: 100vw;
  height: 100vh;
  filter: blur(4px);
  cursor: not-allowed;
`;

export const MaskText = styled.h3`
  position: absolute;
  bottom: 40%;
  color: white;
  text-align: center;
  text-shadow: 2px 2px #000000;
  cursor: not-allowed;
`;
