export default function normalizeTitle(title: string) {
    return title
        .replace(/[!?.,:;()"-]/g, '')
        .replace(/\s+/g, '')
        .toLowerCase();
}
