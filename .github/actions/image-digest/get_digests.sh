#!/usr/bin/env bash
set -o nounset
set -o errexit
set -o pipefail

image="${1}"
opts="${2}"

usage() {
    echo "$0 <image>"
    exit 1
}

if [ -z "${image}" ]; then
    echo "ERROR: first parameter needs to be set"
    usage
fi

manifest_list=$(docker manifest inspect $opts $image)
if [ $? -ne 0 ]; then
    echo "ERROR: did not find image $image manifest"
    exit 2
fi
jq -r '[.manifests[] | select(.platform.architecture | contains ("unknown") | not) | {digest: .digest, platform: (.platform.os +"/"+ .platform.architecture)}]' <<<"$manifest_list"
