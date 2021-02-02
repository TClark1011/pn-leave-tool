import { useMount } from "react-use";

const useDocTitle = (title, postfix = " - PN Leave Tool") =>
	useMount(() => (document.title = title + postfix));
export default useDocTitle;
