export default function Logo({ colorFont = '#111111', colorFill = '#F6F6F6' }) {
    return (
        <svg width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="260" height="260" rx="130" fill={colorFill}/>
        <path d="M96.4411 56.487C96.6781 58.383 95.4931 57.198 92.4121 52.932C88.1461 47.007 86.2501 43.452 89.3311 46.77C90.0421 47.718 91.2271 47.955 91.7011 47.718C92.1751 47.244 92.6491 48.192 92.8861 49.614C93.1231 51.036 93.5971 52.221 94.3081 52.458C94.7821 52.458 95.2561 51.51 95.0191 50.088C94.5451 47.955 95.0191 47.718 98.3371 48.192C101.655 48.666 101.892 48.429 100.47 47.244C99.2851 46.533 98.8111 45.348 99.2851 44.874C99.7591 44.163 99.7591 42.978 99.0481 41.793C98.3371 40.608 98.3371 40.134 99.2851 40.134C99.9961 40.371 100.707 39.897 100.707 39.186C100.707 38.475 99.2851 37.764 97.1521 37.527C93.3601 37.053 93.8341 35.394 97.8631 35.631C99.0481 35.868 101.181 35.868 102.366 36.105C104.025 36.105 104.499 35.631 104.262 34.92C103.788 33.735 104.262 33.735 105.921 34.446C107.343 34.92 108.765 34.92 109.002 34.446C109.476 33.972 111.372 33.735 113.268 33.972C115.164 34.209 116.586 33.972 116.349 33.261C116.112 32.787 118.245 32.787 121.563 33.498C125.355 34.446 127.014 34.446 126.777 33.498C126.303 32.55 127.251 32.55 129.621 33.498C131.991 34.446 133.176 34.446 133.176 33.498C133.413 32.787 133.887 32.55 134.598 33.024C136.494 34.683 141.708 35.631 142.893 34.446C143.604 33.498 144.078 33.735 144.552 34.92C145.263 36.105 145.737 36.342 146.448 35.394C147.159 34.683 147.87 34.683 148.581 35.631C149.292 36.342 151.425 36.816 153.321 37.053C155.217 37.053 157.113 37.527 157.824 38.001C158.298 38.475 161.142 39.423 163.986 39.897C166.593 40.608 169.674 42.03 170.859 43.452C172.044 44.637 172.755 45.111 172.281 44.163C171.807 42.741 172.044 42.741 173.703 43.926C174.888 44.874 176.073 46.296 176.31 47.244C176.547 48.192 176.784 48.429 177.021 47.244C177.495 45.348 184.842 50.562 184.368 52.695C184.368 53.643 185.079 53.88 186.264 53.643C187.449 53.406 189.108 54.591 190.293 56.487C191.715 58.146 192.9 59.331 193.374 59.094C193.848 58.62 194.322 59.568 194.559 60.99C194.796 62.412 195.507 63.834 196.455 63.834C197.403 64.071 197.877 65.256 197.64 66.441C197.403 67.863 197.877 68.574 198.588 68.337C199.299 68.1 200.247 69.522 200.721 71.418C200.958 73.551 201.906 75.21 202.617 75.447C203.328 75.447 203.328 76.869 202.617 78.765C201.669 81.372 201.906 82.32 203.802 83.268C205.224 83.742 205.698 84.453 204.75 84.69C204.039 84.927 203.565 85.875 203.802 86.823C204.039 87.771 203.328 88.482 202.617 88.482C201.669 88.245 202.143 88.956 203.328 89.667C204.75 90.378 205.698 91.563 205.698 92.274C205.461 92.985 204.987 93.222 204.513 92.748C204.039 92.274 203.091 92.748 202.617 93.696C201.195 96.066 201.195 96.303 203.328 96.777C204.276 96.777 204.987 97.488 204.75 97.962C204.75 98.673 203.802 99.621 202.617 100.569C201.669 101.28 200.484 103.413 200.247 105.072C200.01 106.731 199.062 108.153 197.877 108.39C196.929 108.627 195.981 109.338 195.981 110.049C195.981 110.523 196.692 110.523 197.877 110.049C200.247 108.39 201.432 109.812 199.299 111.708C198.588 112.656 198.114 114.078 198.351 115.263C198.588 116.448 198.114 117.159 197.403 116.685C195.507 115.974 191.478 121.188 193.137 121.899C195.27 123.084 193.611 125.217 190.056 126.165C186.975 127.113 186.264 128.061 185.79 131.142C185.316 134.223 184.605 134.934 181.287 135.882C179.154 136.356 178.206 137.067 178.917 137.541C180.813 138.489 179.865 141.333 177.495 141.096C174.888 140.622 169.437 143.94 170.385 145.125C170.859 145.599 170.148 145.836 169.2 145.599C168.015 145.599 167.067 145.836 167.067 146.547C167.067 147.021 167.778 147.495 168.726 147.258C169.674 147.021 170.385 147.495 170.385 147.969C170.385 148.68 169.437 149.154 168.489 149.154C167.541 148.917 166.593 149.628 166.593 150.339C166.356 151.287 163.986 152.235 161.142 152.472C157.587 152.946 155.454 153.657 154.98 155.316C154.269 156.501 154.506 157.686 155.217 157.686C155.928 157.923 154.743 158.634 152.373 159.345C150.003 160.056 147.396 160.293 146.448 160.056C145.5 159.819 145.263 160.056 145.5 161.004C145.974 162.189 145.5 162.189 143.367 161.478C140.523 160.293 140.286 160.53 140.523 162.9C140.523 165.27 139.812 165.981 136.02 166.455C133.65 166.929 130.569 167.403 129.384 167.403C127.962 167.403 127.014 168.114 127.014 169.062C127.014 170.247 126.54 171.195 125.829 171.669C125.118 171.906 124.644 171.432 124.644 170.721C124.881 170.01 124.644 169.536 124.17 170.01C123.696 170.247 122.511 169.773 121.326 169.062C120.378 168.351 119.193 168.114 118.719 168.588C118.245 169.062 118.956 170.01 120.378 170.721C122.511 171.906 122.274 171.906 118.245 172.38C114.453 172.854 113.268 172.617 112.557 171.195C112.083 170.01 111.846 170.247 112.083 172.143C112.083 174.276 111.609 174.75 109.713 174.513C106.158 174.039 104.499 174.987 103.077 179.253C102.129 181.86 102.129 182.808 103.314 182.334C104.262 182.097 103.788 182.334 102.603 183.282C100.707 184.467 100.47 184.704 101.892 185.415C104.262 186.837 103.551 189.681 100.707 190.155C99.2851 190.392 98.3371 191.103 98.1001 191.577C98.1001 192.288 98.8111 192.525 99.7591 192.288C101.655 191.814 103.077 194.184 101.181 194.895C100.47 195.369 99.9961 196.08 100.233 196.554C101.181 198.45 99.7591 210.537 98.8111 210.537C98.1001 210.3 98.1001 211.485 98.8111 212.907C99.7591 215.04 99.5221 215.514 98.1001 216.225C96.4411 216.936 96.4411 217.41 97.8631 218.595C100.233 220.491 99.9961 222.387 97.8631 222.15C96.6781 221.913 95.9671 222.861 95.7301 224.283C95.4931 225.468 94.7821 226.179 94.3081 225.705C93.5971 225.231 93.5971 224.283 93.8341 223.809C94.3081 223.335 93.8341 223.098 92.6491 223.098C91.4641 223.098 90.0421 223.098 89.5681 223.098C87.6721 223.098 88.6201 225.468 90.7531 225.705C93.5971 226.179 93.5971 227.838 90.7531 228.549C88.8571 229.023 88.8571 229.26 90.0421 230.445C90.9901 231.156 91.9381 231.156 92.4121 230.445C93.1231 229.971 94.0711 229.734 95.0191 230.208C95.9671 230.682 95.4931 231.156 93.5971 231.867C90.2791 233.052 86.4871 231.63 86.7241 229.023C86.9611 228.075 86.4871 227.601 85.7761 227.838C85.0651 228.312 84.5911 227.601 84.8281 226.653C84.8281 225.705 84.5911 224.757 83.8801 224.757C83.4061 224.52 82.9321 225.705 83.1691 226.89C83.4061 228.312 83.8801 229.497 84.3541 229.497C85.0651 229.497 85.3021 229.971 85.3021 230.682C85.0651 231.63 83.4061 231.63 79.6141 229.971C76.7701 228.786 76.7701 228.786 79.3771 228.549C82.9321 228.075 82.4581 225.468 78.1921 220.254C75.8221 217.173 75.3481 216.225 76.7701 215.514C77.9551 215.04 78.1921 214.092 77.7181 213.144C77.4811 212.196 77.0071 210.537 77.0071 209.589C77.0071 208.404 77.4811 208.404 78.4291 210.3C79.1401 211.485 80.3251 212.196 81.0361 211.959C83.1691 211.011 82.6951 209.826 79.8511 207.93C76.7701 205.797 76.5331 204.138 79.3771 203.664C80.5621 203.427 80.7991 203.664 80.3251 204.138C79.8511 204.849 80.0881 205.323 80.5621 205.323C81.7471 205.56 84.5911 203.427 84.8281 202.242C85.0651 201.294 81.5101 201.057 79.3771 202.005C78.6661 202.479 78.1921 201.768 78.6661 200.109C78.9031 198.687 79.8511 197.739 80.5621 198.213C81.5101 198.45 81.9841 197.739 81.9841 196.554C81.7471 195.369 81.0361 194.421 79.8511 194.421C78.4291 194.421 78.1921 193.947 78.9031 192.288C79.6141 190.629 80.5621 190.155 81.7471 190.866C82.9321 191.34 82.6951 191.103 81.5101 189.681C79.8511 188.022 79.6141 187.311 81.0361 186.837C81.9841 186.363 82.6951 185.652 82.6951 185.415C82.6951 183.282 83.1691 183.045 83.8801 184.704C84.5911 186.363 85.0651 186.363 86.9611 184.941C89.3311 183.045 89.3311 183.045 85.0651 183.045C81.5101 183.045 80.5621 182.808 80.7991 181.386C81.0361 180.438 81.7471 180.201 82.6951 180.675C83.6431 181.149 84.3541 180.912 84.5911 179.964C84.8281 177.357 83.4061 174.987 81.7471 175.698C80.5621 176.172 80.5621 175.698 81.2731 174.039C82.2211 172.38 81.9841 171.432 80.7991 170.721C79.8511 170.247 79.1401 169.299 79.1401 168.825C79.3771 168.114 80.0881 168.114 80.7991 168.588C82.6951 169.536 84.3541 165.981 83.4061 163.374C82.6951 161.241 85.0651 156.738 86.9611 156.975C87.4351 157.212 87.9091 156.738 87.6721 156.027C87.1981 155.316 85.7761 155.553 84.3541 156.738C82.9321 157.923 81.2731 158.16 80.5621 157.686C79.8511 156.975 80.3251 156.501 81.9841 156.027C84.8281 155.553 85.5391 153.657 86.9611 141.807C87.4351 138.015 87.9091 137.067 88.6201 138.252C90.2791 140.385 90.9901 140.385 91.7011 137.778C91.9381 136.119 91.4641 135.408 90.0421 135.171C88.8571 134.934 87.9091 133.986 87.9091 133.038C88.1461 132.09 88.8571 131.853 89.8051 132.327C90.9901 133.038 91.7011 132.564 91.7011 131.379C91.9381 130.431 91.2271 129.483 90.2791 129.246C89.0941 129.246 88.8571 128.061 89.0941 125.928C89.5681 123.084 89.8051 122.847 90.9901 124.98C91.7011 126.639 92.4121 126.876 93.1231 126.165C93.5971 125.691 93.5971 124.98 93.1231 124.98C91.7011 124.743 89.3311 118.107 90.0421 116.685C90.5161 115.974 91.2271 115.737 91.7011 115.974C92.4121 116.448 92.8861 116.448 92.8861 115.737C93.1231 115.026 94.0711 113.841 95.2561 113.13C96.6781 111.945 96.9151 111.471 95.7301 111.234C94.7821 111.234 93.3601 111.708 92.4121 112.182C91.2271 113.13 90.9901 112.656 91.4641 110.286C91.7011 108.39 92.1751 107.442 92.6491 107.916C93.1231 108.153 94.5451 107.679 95.9671 106.494C98.1001 104.598 98.1001 104.361 95.4931 104.361C93.5971 104.361 92.8861 103.65 92.8861 102.228C92.6491 101.043 93.1231 100.332 93.5971 100.806C94.0711 101.043 95.2561 100.806 96.2041 100.095C97.8631 98.673 97.8631 98.436 95.7301 98.91C93.5971 99.147 93.3601 98.91 94.0711 97.014C94.7821 95.592 95.9671 94.881 97.8631 95.118C99.5221 95.355 100.47 95.118 100.233 94.407C99.9961 93.696 99.0481 93.222 98.3371 93.696C96.9151 94.17 95.2561 91.563 95.7301 88.956C95.9671 87.771 96.2041 87.771 96.6781 88.719C97.6261 90.615 104.499 92.748 104.736 91.326C104.736 90.615 104.025 90.141 102.84 90.141C100.233 90.141 95.9671 86.586 96.4411 84.69C96.4411 83.979 97.3891 83.268 98.3371 83.505C99.2851 83.742 99.9961 83.268 100.233 82.557C100.233 81.846 99.5221 81.372 98.5741 81.609C97.3891 81.846 97.1521 80.898 97.8631 77.106C99.5221 70.707 99.5221 70.47 100.707 71.418C101.181 71.892 101.655 71.892 101.892 71.181C102.129 69.522 100.47 69.285 98.5741 70.944C96.6781 72.129 96.6781 70.47 98.5741 68.337C99.2851 67.626 100.47 67.389 100.944 67.863C101.655 68.337 104.262 68.811 107.106 68.811C112.083 68.811 112.083 68.574 109.002 67.389C106.632 66.204 105.21 66.204 104.499 67.152C103.788 68.1 103.314 67.863 102.603 66.441C101.892 65.256 102.129 64.545 103.551 64.545C104.499 64.545 105.21 63.834 105.447 63.123C105.447 62.412 106.632 62.412 107.817 62.886C109.002 63.36 110.424 63.36 110.898 62.886C111.135 62.412 112.083 62.412 112.794 62.886C113.505 63.36 113.742 63.36 113.268 62.412C112.794 61.464 112.083 61.227 111.609 61.464C110.898 61.701 109.713 60.516 109.002 59.094C107.817 56.724 107.58 56.487 107.343 57.909C107.106 59.331 106.395 59.568 104.973 58.857C103.788 58.383 102.84 57.435 103.077 56.961C103.314 56.25 102.84 55.302 102.129 55.065C100.944 54.354 100.707 54.591 101.181 55.776C101.655 57.198 101.655 57.198 100.47 56.013C98.3371 53.169 95.9671 53.406 96.4411 56.487ZM100.707 77.343C101.181 77.106 100.944 76.158 100.233 75.21C99.5221 74.262 99.0481 74.262 99.0481 74.973C98.8111 76.395 99.9961 78.054 100.707 77.343ZM78.4291 218.121C78.9031 219.543 81.2731 218.832 81.5101 217.173C81.5101 216.699 80.7991 216.462 79.8511 216.699C78.6661 216.936 78.1921 217.647 78.4291 218.121ZM93.5971 120.24C94.5451 119.055 94.7821 119.292 95.0191 120.951C95.4931 122.136 96.4411 122.61 97.3891 122.61C98.8111 122.136 98.8111 121.662 96.9151 120.003C94.5451 117.87 90.7531 117.87 91.7011 120.24C92.1751 121.188 92.6491 121.188 93.5971 120.24ZM90.0421 142.281C89.5681 142.044 88.8571 142.518 88.8571 143.229C88.8571 143.94 89.5681 144.414 90.5161 144.651C91.4641 144.651 91.9381 144.414 91.7011 143.703C91.4641 142.992 90.7531 142.281 90.0421 142.281ZM88.3831 150.102C88.6201 150.102 89.3311 149.865 89.8051 149.154C90.2791 148.68 89.8051 147.969 88.8571 147.969C87.6721 147.732 87.1981 148.206 87.4351 148.917C87.6721 149.628 88.1461 150.102 88.3831 150.102ZM88.1461 165.507C88.6201 165.507 88.8571 165.033 88.6201 164.322C88.3831 163.611 87.6721 162.9 86.9611 162.9C86.2501 162.9 86.0131 163.374 86.4871 164.085C86.7241 164.559 87.4351 165.27 88.1461 165.507ZM95.9671 129.72C97.6261 129.957 99.0481 129.72 99.0481 129.246C99.2851 127.587 97.3891 126.876 95.0191 128.298C92.8861 129.483 92.8861 129.483 95.9671 129.72ZM83.6431 222.15C84.8281 222.387 85.5391 222.387 85.0651 221.913C84.8281 221.439 83.8801 221.202 82.9321 221.439C81.9841 221.676 82.2211 221.913 83.6431 222.15ZM96.9151 136.119C97.6261 136.356 98.1001 136.119 98.1001 135.882C98.1001 135.645 97.8631 134.934 97.1521 134.46C96.6781 133.986 95.9671 134.223 95.9671 134.697C95.9671 135.408 96.2041 136.119 96.9151 136.119ZM104.736 72.129C104.262 73.077 104.499 73.551 105.684 73.314C106.632 73.077 107.58 72.603 107.58 72.366C107.817 71.181 105.447 70.707 104.736 72.129ZM103.077 79.002C101.181 79.713 100.707 80.187 101.655 80.424C102.603 80.661 104.262 80.424 105.21 79.95C108.291 78.528 106.395 77.817 103.077 79.002ZM104.736 86.349C108.054 87.06 108.054 86.823 105.921 85.401C104.499 84.453 102.84 84.216 102.129 84.69C101.418 85.401 102.366 85.875 104.736 86.349ZM107.343 124.743C107.817 124.269 107.817 123.558 107.106 123.558C106.395 123.558 105.921 123.795 105.684 124.506C105.684 125.217 105.684 125.691 106.158 125.691C106.395 125.691 106.869 125.454 107.343 124.743ZM98.1001 200.346C97.3891 200.583 96.6781 201.531 96.6781 202.005C96.4411 202.716 96.9151 202.953 97.6261 202.716C98.3371 202.479 99.0481 201.531 99.0481 201.057C99.2851 200.346 98.8111 200.109 98.1001 200.346ZM111.609 159.345C112.794 159.582 113.505 159.345 113.268 159.108C112.794 158.634 111.846 158.397 111.135 158.634C109.95 158.871 110.187 159.108 111.609 159.345ZM124.17 155.079C124.644 154.842 124.881 153.894 124.644 152.946C124.407 151.998 124.17 152.235 123.933 153.657C123.696 154.842 123.696 155.553 124.17 155.079ZM128.199 151.998C128.673 154.131 130.569 154.605 131.043 152.472C131.28 150.576 127.014 148.68 125.829 150.102C125.355 150.813 125.592 151.05 126.303 150.576C127.251 150.339 127.962 150.813 128.199 151.998ZM137.679 163.374C138.153 163.374 138.864 162.9 138.864 162.426C139.101 161.715 138.627 161.004 137.916 161.004C137.205 161.004 136.731 161.478 136.494 161.952C136.494 162.663 136.968 163.137 137.679 163.374ZM142.182 151.05C143.367 151.287 144.315 151.287 144.078 151.05C143.841 150.813 142.893 149.865 141.945 148.917C140.76 147.732 140.286 147.732 140.049 148.917C140.049 149.865 140.76 150.813 142.182 151.05ZM147.87 146.073C148.107 146.073 148.344 145.599 148.581 144.888C148.581 144.414 148.107 143.703 147.396 143.703C146.685 143.466 146.448 143.94 146.685 144.651C147.159 145.362 147.633 146.073 147.87 146.073ZM152.847 144.414C153.084 144.414 153.321 143.94 153.558 143.466C153.558 142.755 153.084 142.044 152.373 142.044C151.662 141.807 151.425 142.518 151.662 142.992C152.136 143.703 152.61 144.414 152.847 144.414ZM152.373 135.408C152.136 136.593 152.373 137.304 152.847 137.067C153.084 136.83 153.321 135.645 153.084 134.934C152.847 133.986 152.61 134.223 152.373 135.408ZM155.691 138.252C157.113 140.859 157.35 140.859 157.587 138.726C157.824 137.778 157.113 136.83 156.165 136.593C154.743 136.593 154.506 136.83 155.691 138.252ZM164.46 132.09C165.171 132.09 165.645 131.853 165.882 131.142C165.882 130.668 165.408 129.72 164.934 129.246C164.46 128.772 163.749 129.009 163.749 130.194C163.512 131.142 163.986 131.853 164.46 132.09ZM171.57 128.298C172.518 128.535 173.466 127.824 173.466 126.876C173.703 125.928 172.992 125.454 172.044 125.691C170.859 125.928 170.148 126.639 169.911 127.113C169.911 127.587 170.622 128.298 171.57 128.298ZM177.021 118.581C177.732 118.818 178.206 118.581 178.206 118.344C178.443 118.107 177.969 117.396 177.258 116.922C176.784 116.448 176.31 116.685 176.073 117.159C176.073 117.87 176.547 118.581 177.021 118.581ZM187.212 100.095C185.79 99.858 184.605 99.147 184.842 98.436C184.842 97.725 184.131 97.962 182.946 98.91C181.998 100.095 181.287 101.517 181.524 102.228C181.998 102.939 182.472 102.939 182.709 101.991C183.183 101.28 183.894 101.043 184.368 101.517C184.842 101.991 186.264 101.991 187.449 101.517C189.582 100.806 189.582 100.569 187.212 100.095ZM165.645 57.435C164.697 57.198 163.749 57.672 163.749 58.146C163.749 58.62 164.46 59.094 165.408 59.331C166.356 59.568 167.067 59.094 167.067 58.62C167.304 58.146 166.593 57.435 165.645 57.435ZM162.801 53.169C161.616 53.643 160.668 54.354 160.668 54.591C160.668 54.828 161.379 54.828 162.564 54.591C163.512 54.354 164.46 53.643 164.46 53.169C164.46 52.458 163.749 52.458 162.801 53.169ZM157.35 50.799C156.402 52.221 156.402 52.458 157.824 51.51C158.772 50.799 159.246 49.851 158.772 49.614C158.535 49.14 157.824 49.614 157.35 50.799ZM154.032 38.949C153.795 38.949 153.558 39.66 153.321 40.608C153.321 41.556 153.558 42.267 154.269 42.504C154.743 42.504 155.217 41.793 154.98 40.845C154.743 39.66 154.269 38.949 154.032 38.949ZM144.078 39.66C143.604 39.66 142.893 40.134 142.893 40.608C142.656 41.319 142.893 41.793 143.13 42.03C143.367 42.03 144.078 41.556 144.552 41.082C145.026 40.371 144.789 39.897 144.078 39.66ZM135.072 37.29C134.361 37.053 134.124 37.527 134.361 38.238C134.598 38.949 135.072 39.66 135.309 39.66C135.546 39.66 136.02 39.186 136.02 38.475C136.257 38.001 135.783 37.29 135.072 37.29ZM127.962 38.001C127.251 37.527 126.777 37.764 126.54 38.949C126.303 40.845 127.014 41.319 128.199 39.897C128.673 39.186 128.436 38.475 127.962 38.001ZM118.245 36.579C117.771 37.527 118.008 38.001 119.193 37.527C120.141 37.527 121.089 37.053 121.089 36.816C121.326 35.394 118.956 35.157 118.245 36.579ZM119.667 56.013C114.216 55.302 110.898 56.25 112.557 58.383C112.794 58.857 113.742 58.383 114.453 57.672C115.401 56.487 115.638 57.198 115.164 59.805C114.927 62.886 115.164 63.597 117.06 63.834C118.245 64.071 119.193 65.019 119.193 65.73C118.956 66.678 119.193 66.678 120.141 65.73C120.852 64.782 121.563 64.782 122.037 65.73C122.274 66.441 122.037 67.152 121.326 67.389C120.615 67.863 120.141 68.811 120.378 69.759C120.615 70.707 120.141 71.418 119.43 71.418C118.719 71.181 118.245 72.366 118.245 73.788C118.245 75.21 118.719 76.395 119.43 76.395C121.089 76.395 119.904 80.661 117.771 82.083C117.06 82.794 116.349 83.979 116.349 84.927C116.112 86.349 116.349 86.349 117.297 85.401C118.008 84.216 118.719 84.216 118.956 85.164C119.43 86.112 118.482 87.534 117.06 88.719C113.979 91.089 113.979 93.222 117.06 92.511C119.43 92.037 118.482 93.696 113.979 97.488C111.135 99.858 111.135 99.858 113.979 98.91C116.112 98.199 116.586 98.199 116.586 99.384C116.349 100.332 115.638 101.517 114.69 102.228C113.505 102.939 113.505 103.413 114.453 103.413C115.164 103.65 115.638 104.835 115.401 106.02C115.401 107.442 114.69 108.153 114.216 107.679C113.505 106.968 112.794 107.679 112.794 109.101C112.557 110.523 112.794 111.471 113.268 111.234C113.979 110.997 113.979 113.367 113.505 116.685C112.794 120.477 112.083 122.61 111.372 122.373C110.661 121.899 109.95 123.321 109.713 125.217C109.476 127.113 109.95 128.772 110.661 128.772C112.557 129.009 112.32 130.668 109.95 132.09C108.765 132.801 107.817 133.749 107.817 134.46C107.817 134.934 108.291 135.408 109.476 135.645C111.609 135.882 111.372 136.83 108.765 138.726C106.869 140.148 106.869 140.622 108.291 142.044C109.476 143.229 109.476 144.414 108.291 147.021C107.106 149.865 107.106 150.576 109.239 151.287C110.424 151.998 111.846 151.998 112.083 151.287C113.268 149.391 114.69 150.576 114.69 153.183C114.453 154.842 114.69 154.368 115.401 152.235C116.349 148.917 116.586 148.68 119.667 149.628C122.274 150.576 122.985 150.576 122.511 149.154C122.274 147.495 124.17 146.073 126.066 146.784C126.303 147.021 127.725 146.547 128.673 145.836C129.858 145.125 131.517 144.888 132.228 145.599C132.939 146.31 133.176 146.073 132.939 144.651C132.702 143.229 133.176 142.755 134.835 142.992C136.02 143.229 136.968 142.755 136.731 142.044C136.257 141.333 136.968 140.859 137.916 141.096C138.864 141.096 139.812 140.859 139.812 140.385C139.812 139.674 141.471 139.2 143.604 139.2C145.5 138.963 146.922 138.489 146.685 137.778C145.974 135.882 151.899 132.327 154.506 133.275C155.928 133.749 156.876 133.512 157.113 132.564C157.113 131.616 156.876 130.905 156.402 130.905C155.691 130.668 155.454 130.194 155.454 129.483C155.691 129.009 156.402 128.535 157.113 128.535C158.061 128.772 159.72 127.824 160.905 126.639C163.038 124.98 163.749 124.98 164.934 126.402C166.119 127.587 166.356 127.587 166.593 126.165C166.83 124.98 166.356 124.032 165.645 124.032C163.749 123.795 164.697 121.662 167.541 120.714C169.911 119.766 170.148 120.003 169.2 121.425C168.726 122.373 168.726 123.321 169.437 123.321C169.911 123.558 170.622 122.61 170.859 121.188C171.096 120.003 170.385 118.818 169.437 118.581C168.489 118.581 168.963 117.633 171.333 115.737C173.466 114.315 175.599 113.367 176.31 113.604C178.206 114.315 178.206 113.13 176.547 110.76C175.599 109.575 175.362 108.39 175.836 107.679C177.021 106.494 179.865 106.968 179.865 108.39C179.628 109.101 181.05 109.101 182.709 108.153C184.605 107.442 185.79 106.494 185.553 106.02C185.316 105.783 184.131 106.02 182.946 106.731C181.287 107.679 180.813 107.679 180.102 106.257C179.628 105.072 179.628 104.124 180.102 103.413C180.576 102.939 180.339 101.754 179.628 100.806C178.917 99.384 178.917 98.91 179.865 99.147C180.576 99.147 181.287 97.962 181.524 96.303C181.761 94.17 182.472 93.696 184.605 93.933C187.212 94.17 187.212 94.17 184.842 92.748C183.42 92.037 182.472 90.615 182.472 89.667C182.709 88.482 183.42 88.245 184.368 88.719C185.079 89.193 186.264 88.956 186.738 88.482C187.449 87.771 186.501 87.06 184.842 86.823C181.287 86.349 180.813 83.742 184.131 82.32C186.738 81.135 186.738 81.135 184.131 81.372C181.761 81.372 178.443 77.817 178.68 75.684C178.917 74.499 174.414 70.707 173.229 70.944C172.755 70.944 172.518 70.47 172.518 69.759C172.755 69.285 172.044 68.574 171.096 68.337C170.148 68.337 169.437 67.626 169.437 66.915C169.437 66.441 170.385 65.967 171.333 66.204C172.281 66.204 173.466 65.73 173.94 65.019C174.414 64.545 174.414 64.071 173.94 64.308C173.229 64.782 170.622 65.019 168.252 65.019C164.223 65.019 163.749 64.782 164.46 63.36C165.171 62.412 164.934 61.701 164.223 62.175C163.512 62.412 160.194 61.938 156.639 60.99C153.321 60.042 150.951 58.857 151.899 58.62C152.847 58.146 152.61 57.672 150.951 56.961C149.766 56.487 149.055 56.487 149.292 56.961C149.529 57.672 145.5 57.435 140.523 56.724C135.072 55.776 131.754 54.828 132.702 54.354C133.887 53.88 133.887 53.643 132.465 53.406C131.28 53.169 130.332 53.88 130.095 54.828C130.095 55.776 129.384 56.25 128.673 56.25C127.962 56.25 127.725 55.539 128.436 55.065C128.91 54.354 127.725 53.88 125.355 53.406C122.037 52.932 121.8 52.932 123.696 54.828C125.592 56.724 125.118 56.961 119.667 56.013ZM109.713 54.354C108.765 55.776 109.002 56.013 110.187 55.065C111.135 54.354 111.609 53.406 111.372 53.169C111.135 52.695 110.424 53.169 109.713 54.354ZM102.603 40.608C101.181 40.371 100.944 43.689 102.603 44.637C103.314 45.111 104.025 45.348 104.025 45.585C104.262 45.585 104.025 44.637 104.025 43.215C103.788 41.793 103.314 40.845 102.603 40.608Z" fill={colorFont}/>
        </svg>
    )
}
