export function toKebabCase (string) {
    return string.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-').replace(/\-+/g, '-')
}