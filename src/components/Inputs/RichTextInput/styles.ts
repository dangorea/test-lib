import styled from "styled-components";

export const RichEditorWrapper = styled.div`
  color: #577083;

  & > .public-DraftStyleDefault-block {
    margin: 0;
  }

  & > .wrapperClassName {
    min-height: 46px;
    min-width: 378px;
    background-color: #fff;
    border-radius: 6px;
    border: 1px solid #c1e4fe;
    margin-top: 6px;

    & > .toolbarClassName {
      display: flex;
      margin: 0;
      padding: 0;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      border-bottom: 1px solid #c1e4fe;
    }

    & > .editorClassName {
      outline: none;
      user-select: text;
      white-space: pre-wrap;
      overflow-wrap: break-word;
      background-color: #fff;
      min-height: 46px;
      padding: 12px;
      border: 1px solid #c1e4fe;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      color: #162d3d;
      font-size: 16px;
      line-height: 24px;
      font-weight: 400;
      overflow: auto;
      height: 200px;

      .public-DraftStyleDefault-block {
        margin: 0;
      }

      .DraftEditor-root {
        position: relative;
        height: 0;
      }
    }
  }
`;
