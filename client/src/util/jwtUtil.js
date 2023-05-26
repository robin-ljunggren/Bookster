import memoryService from "../service/memoryService";

function parsePayload () {
    const token = memoryService.getSessionValue("JWT_TOKEN");
    const payload = token.split(".")[1];

    return JSON.parse(atob(payload));
}

const jwtUtil = { parsePayload };
export default jwtUtil;