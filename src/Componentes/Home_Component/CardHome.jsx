import './CardHome.css';
import logo from '../../assets/logo.png';

import psico from '../../assets/psicologia.svg';
//importar el navigate
import { useNavigate } from "react-router-dom";

const CardHome = ({Email, Nombre, Rol, Label1, Label2, Label3, Label4, Value1, Value2, Value3, Value4}) => {
  const navigate = useNavigate();
  const RolActivo = Rol;
  
  const CerrarSesion = () => {
    localStorage.clear();
    navigate("/Login");
  };

  return (
    <div className='ContainerCardHome'>
      <div className="containerTopCardHome">
        <div className="containerImageProfile">
          <div className="ImageContainer">
            <img src={logo} alt="Logo" className="ImageProfile" />
          </div>
        </div>
        <div className="containerOptionCardLeftTop">
          <p className="TitleDelgado">¡Welcome!</p>
          <p className="TitleNombre">{Nombre}</p>
          <p className="TitleEtiqueta">{Email}</p>
        </div>
      </div>
      <div className="containerBottomCardHome">
        <div className="containerResumenHome">
          <div className="ContainerlineBlue">
            <div className="lineBlue"></div>
          </div>
          <div className="containerResumenValues">
            <div className="containerTitleActvidad">
              <p className="TitleActvidad">Resumen de actividad</p>
            </div>
            <div className="containerValuesResume">
              <p className="TitleValues">{Label1}</p>
              <p className="Values">{Value1}</p>
            </div>
            <div className="containerValuesResume">
              <p className="TitleValues">{Label2}</p>
              <p className="Values">{Value2}</p>
            </div>
            <div className="containerValuesResume">
              <p className="TitleValues">{Label3}</p>
              <p className="Values">{Value3}</p>
            </div>
            <div className="containerValuesResume">
              <p className="TitleValues">{Label4}</p>
              <p className="Values">{Value4}</p>
            </div>
          </div>
        </div>
        <div className="containerRolIcon">
        <div className={RolActivo === 'Administrador' ? 'containerOptionActive' : 'containerOption'}>
        {RolActivo === "Administrador" ? (
  <svg className="IconDesactive" version="1.0" xmlns="http://www.w3.org/2000/svg"
              width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
              preserveAspectRatio="xMidYMid meet">

              <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                fill="#fff" stroke="none">
                <path d="M2161 4894 c-68 -18 -109 -43 -156 -95 -68 -75 -79 -115 -83 -285
l-4 -151 -90 -37 -91 -37 -102 100 c-124 123 -166 144 -280 145 -132 0 -141
-6 -448 -312 -311 -310 -322 -326 -321 -457 0 -110 23 -154 146 -281 l99 -101
-37 -91 -37 -90 -151 -4 c-142 -3 -155 -5 -208 -31 -72 -35 -141 -110 -165
-180 -16 -47 -18 -90 -18 -427 0 -337 2 -380 18 -427 24 -70 93 -145 165 -180
53 -26 66 -28 208 -31 l151 -4 37 -91 37 -91 -95 -95 c-123 -125 -150 -176
-150 -286 0 -132 6 -141 312 -448 311 -312 326 -322 457 -321 114 1 156 23
280 145 l102 100 91 -37 90 -37 4 -151 c3 -142 5 -155 31 -208 35 -72 110
-141 180 -165 47 -16 90 -18 427 -18 337 0 380 2 427 18 70 24 145 93 180 165
26 54 28 66 31 209 4 146 5 152 25 159 12 3 53 20 90 36 l69 29 101 -98 c128
-124 172 -147 282 -147 131 -1 147 10 457 321 306 307 312 316 312 448 0 110
-23 154 -146 281 l-99 101 37 91 37 90 151 4 c142 3 155 5 208 31 72 35 141
110 165 180 16 47 18 90 18 427 0 337 -2 380 -18 427 -24 70 -93 145 -165 180
-53 26 -66 28 -208 31 l-151 4 -37 90 -37 91 99 101 c123 127 146 171 146 281
0 132 -6 141 -312 448 -310 311 -326 322 -457 321 -110 0 -154 -23 -282 -147
l-101 -98 -69 29 c-37 16 -78 33 -90 36 -20 7 -21 13 -25 159 -3 143 -5 155
-31 209 -34 69 -109 139 -175 164 -42 16 -88 19 -412 21 -298 2 -375 0 -419
-13z m791 -233 l33 -29 5 -195 c4 -170 7 -198 23 -215 10 -11 58 -34 107 -51
48 -17 127 -49 174 -71 135 -64 135 -64 290 89 141 139 170 155 223 127 34
-18 496 -481 513 -514 24 -47 4 -81 -131 -218 -155 -158 -154 -153 -80 -313
27 -58 58 -136 70 -172 34 -105 31 -103 258 -109 l195 -5 29 -33 29 -32 0
-360 0 -360 -29 -32 -29 -33 -195 -5 c-227 -6 -224 -4 -258 -109 -12 -36 -43
-114 -70 -172 -74 -160 -75 -155 80 -313 135 -137 155 -171 131 -218 -17 -33
-479 -496 -513 -514 -53 -28 -82 -12 -223 127 -156 153 -158 154 -292 89 -45
-22 -123 -54 -172 -71 -49 -17 -97 -40 -107 -51 -16 -17 -19 -45 -23 -215 l-5
-195 -33 -29 -32 -29 -360 0 -360 0 -32 29 -33 29 -5 195 c-4 169 -7 198 -23
215 -10 11 -59 34 -110 52 -51 19 -128 51 -171 72 -131 63 -134 62 -290 -91
-141 -139 -170 -155 -223 -127 -34 18 -496 481 -513 514 -24 47 -4 81 131 218
153 155 153 155 89 290 -22 47 -54 126 -71 174 -17 49 -40 97 -51 107 -17 16
-45 19 -215 23 l-195 5 -29 33 -29 32 0 360 0 360 29 32 29 33 195 5 c227 6
224 4 258 109 12 36 44 115 70 175 72 161 74 153 -80 310 -135 137 -155 171
-131 218 17 33 479 496 513 514 53 28 82 12 223 -127 156 -153 156 -153 293
-88 47 22 125 54 173 71 48 16 95 39 105 50 16 17 19 45 23 215 l5 195 33 29
32 29 360 0 360 0 32 -29z"/>
                <path d="M2455 3944 c-335 -34 -615 -160 -847 -383 -286 -274 -431 -611 -431
-1001 0 -228 46 -425 147 -623 69 -137 129 -219 241 -336 116 -121 232 -207
370 -276 393 -195 818 -203 1211 -20 344 159 615 467 732 830 92 283 88 604
-9 883 -59 168 -206 412 -274 453 -45 28 -89 24 -127 -10 -28 -25 -33 -36 -33
-73 0 -37 8 -53 58 -118 68 -89 144 -234 181 -345 111 -333 60 -711 -137
-1012 -23 -35 -44 -63 -48 -63 -4 0 -10 15 -13 34 -9 46 -89 209 -134 271 -91
125 -216 232 -350 299 l-73 37 43 48 c140 156 167 392 66 585 -39 74 -144 181
-215 219 -63 33 -189 67 -253 67 -64 0 -190 -34 -253 -67 -71 -38 -176 -145
-215 -219 -101 -193 -74 -429 66 -585 l43 -48 -73 -37 c-134 -67 -259 -174
-350 -299 -45 -62 -125 -225 -134 -271 -3 -19 -9 -34 -13 -34 -10 0 -85 117
-124 195 -79 159 -117 326 -117 515 0 320 117 603 342 828 224 225 508 342
827 342 198 0 360 -39 542 -131 118 -59 157 -63 200 -20 40 40 41 106 3 144
-65 66 -327 172 -495 201 -90 16 -286 27 -354 20z m240 -783 c239 -113 239
-455 0 -571 -69 -33 -199 -34 -265 -2 -74 36 -117 78 -152 149 -29 59 -33 76
-32 143 1 52 8 89 22 122 72 162 267 235 427 159z m42 -836 c186 -43 365 -177
466 -347 44 -74 87 -200 94 -278 l5 -55 -79 -52 c-106 -71 -248 -136 -368
-169 -93 -26 -113 -28 -295 -28 -181 0 -202 2 -295 27 -112 31 -313 126 -390
185 l-50 38 2 60 c1 36 13 91 30 141 98 272 330 458 623 496 54 8 188 -2 257
-18z"/>
              </g>
            </svg>
          ) : (
           <svg className="IconDesactive" version="1.0" xmlns="http://www.w3.org/2000/svg"
              width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
              preserveAspectRatio="xMidYMid meet">

              <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                fill="#909090" stroke="none">
                <path d="M2161 4894 c-68 -18 -109 -43 -156 -95 -68 -75 -79 -115 -83 -285
l-4 -151 -90 -37 -91 -37 -102 100 c-124 123 -166 144 -280 145 -132 0 -141
-6 -448 -312 -311 -310 -322 -326 -321 -457 0 -110 23 -154 146 -281 l99 -101
-37 -91 -37 -90 -151 -4 c-142 -3 -155 -5 -208 -31 -72 -35 -141 -110 -165
-180 -16 -47 -18 -90 -18 -427 0 -337 2 -380 18 -427 24 -70 93 -145 165 -180
53 -26 66 -28 208 -31 l151 -4 37 -91 37 -91 -95 -95 c-123 -125 -150 -176
-150 -286 0 -132 6 -141 312 -448 311 -312 326 -322 457 -321 114 1 156 23
280 145 l102 100 91 -37 90 -37 4 -151 c3 -142 5 -155 31 -208 35 -72 110
-141 180 -165 47 -16 90 -18 427 -18 337 0 380 2 427 18 70 24 145 93 180 165
26 54 28 66 31 209 4 146 5 152 25 159 12 3 53 20 90 36 l69 29 101 -98 c128
-124 172 -147 282 -147 131 -1 147 10 457 321 306 307 312 316 312 448 0 110
-23 154 -146 281 l-99 101 37 91 37 90 151 4 c142 3 155 5 208 31 72 35 141
110 165 180 16 47 18 90 18 427 0 337 -2 380 -18 427 -24 70 -93 145 -165 180
-53 26 -66 28 -208 31 l-151 4 -37 90 -37 91 99 101 c123 127 146 171 146 281
0 132 -6 141 -312 448 -310 311 -326 322 -457 321 -110 0 -154 -23 -282 -147
l-101 -98 -69 29 c-37 16 -78 33 -90 36 -20 7 -21 13 -25 159 -3 143 -5 155
-31 209 -34 69 -109 139 -175 164 -42 16 -88 19 -412 21 -298 2 -375 0 -419
-13z m791 -233 l33 -29 5 -195 c4 -170 7 -198 23 -215 10 -11 58 -34 107 -51
48 -17 127 -49 174 -71 135 -64 135 -64 290 89 141 139 170 155 223 127 34
-18 496 -481 513 -514 24 -47 4 -81 -131 -218 -155 -158 -154 -153 -80 -313
27 -58 58 -136 70 -172 34 -105 31 -103 258 -109 l195 -5 29 -33 29 -32 0
-360 0 -360 -29 -32 -29 -33 -195 -5 c-227 -6 -224 -4 -258 -109 -12 -36 -43
-114 -70 -172 -74 -160 -75 -155 80 -313 135 -137 155 -171 131 -218 -17 -33
-479 -496 -513 -514 -53 -28 -82 -12 -223 127 -156 153 -158 154 -292 89 -45
-22 -123 -54 -172 -71 -49 -17 -97 -40 -107 -51 -16 -17 -19 -45 -23 -215 l-5
-195 -33 -29 -32 -29 -360 0 -360 0 -32 29 -33 29 -5 195 c-4 169 -7 198 -23
215 -10 11 -59 34 -110 52 -51 19 -128 51 -171 72 -131 63 -134 62 -290 -91
-141 -139 -170 -155 -223 -127 -34 18 -496 481 -513 514 -24 47 -4 81 131 218
153 155 153 155 89 290 -22 47 -54 126 -71 174 -17 49 -40 97 -51 107 -17 16
-45 19 -215 23 l-195 5 -29 33 -29 32 0 360 0 360 29 32 29 33 195 5 c227 6
224 4 258 109 12 36 44 115 70 175 72 161 74 153 -80 310 -135 137 -155 171
-131 218 17 33 479 496 513 514 53 28 82 12 223 -127 156 -153 156 -153 293
-88 47 22 125 54 173 71 48 16 95 39 105 50 16 17 19 45 23 215 l5 195 33 29
32 29 360 0 360 0 32 -29z"/>
                <path d="M2455 3944 c-335 -34 -615 -160 -847 -383 -286 -274 -431 -611 -431
-1001 0 -228 46 -425 147 -623 69 -137 129 -219 241 -336 116 -121 232 -207
370 -276 393 -195 818 -203 1211 -20 344 159 615 467 732 830 92 283 88 604
-9 883 -59 168 -206 412 -274 453 -45 28 -89 24 -127 -10 -28 -25 -33 -36 -33
-73 0 -37 8 -53 58 -118 68 -89 144 -234 181 -345 111 -333 60 -711 -137
-1012 -23 -35 -44 -63 -48 -63 -4 0 -10 15 -13 34 -9 46 -89 209 -134 271 -91
125 -216 232 -350 299 l-73 37 43 48 c140 156 167 392 66 585 -39 74 -144 181
-215 219 -63 33 -189 67 -253 67 -64 0 -190 -34 -253 -67 -71 -38 -176 -145
-215 -219 -101 -193 -74 -429 66 -585 l43 -48 -73 -37 c-134 -67 -259 -174
-350 -299 -45 -62 -125 -225 -134 -271 -3 -19 -9 -34 -13 -34 -10 0 -85 117
-124 195 -79 159 -117 326 -117 515 0 320 117 603 342 828 224 225 508 342
827 342 198 0 360 -39 542 -131 118 -59 157 -63 200 -20 40 40 41 106 3 144
-65 66 -327 172 -495 201 -90 16 -286 27 -354 20z m240 -783 c239 -113 239
-455 0 -571 -69 -33 -199 -34 -265 -2 -74 36 -117 78 -152 149 -29 59 -33 76
-32 143 1 52 8 89 22 122 72 162 267 235 427 159z m42 -836 c186 -43 365 -177
466 -347 44 -74 87 -200 94 -278 l5 -55 -79 -52 c-106 -71 -248 -136 -368
-169 -93 -26 -113 -28 -295 -28 -181 0 -202 2 -295 27 -112 31 -313 126 -390
185 l-50 38 2 60 c1 36 13 91 30 141 98 272 330 458 623 496 54 8 188 -2 257
-18z"/>
              </g>
            </svg>
          )}


          </div>
          <div className={RolActivo === 'Enfermería' ? 'containerOptionActive' : 'containerOption'}>

          {RolActivo === "Enfermería" ? (
  <svg className="IconDesactive" version="1.0" xmlns="http://www.w3.org/2000/svg"
  width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
  preserveAspectRatio="xMidYMid meet">

  <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
    fill="#fff" stroke="none">
    <path d="M1950 4755 c-36 -8 -108 -35 -160 -61 -79 -39 -110 -62 -181 -133
-73 -72 -94 -101 -132 -181 -60 -125 -77 -211 -77 -395 l0 -145 -59 0 -58 0
-7 49 c-9 67 -58 162 -108 206 -22 21 -66 49 -97 64 l-56 26 -260 0 -260 0
-57 -28 c-112 -55 -181 -150 -201 -276 -10 -62 -13 -67 -46 -84 -80 -39 -151
-128 -175 -218 -16 -59 -17 -180 -14 -1514 l3 -1450 28 -57 c36 -73 101 -139
175 -175 l57 -28 2295 0 2295 0 57 28 c74 36 139 102 175 175 l28 57 3 1450
c3 1626 8 1526 -69 1627 -36 49 -121 118 -144 118 -6 0 -15 31 -21 69 -6 38
-21 90 -34 115 -30 63 -103 134 -170 165 -55 26 -56 26 -315 26 l-260 0 -56
-26 c-31 -15 -75 -43 -97 -64 -50 -44 -99 -139 -108 -206 l-7 -49 -52 0 -53 0
-5 178 c-6 200 -15 244 -78 370 -76 155 -230 288 -400 348 l-84 29 -575 2
c-464 1 -588 -1 -640 -12z m1235 -244 c121 -48 206 -126 261 -236 40 -81 53
-164 54 -327 l0 -108 -64 0 -64 0 -4 168 c-3 160 -4 169 -31 220 -37 70 -97
128 -166 161 l-56 26 -555 0 -555 0 -57 -27 c-69 -32 -135 -96 -168 -163 -23
-46 -25 -64 -28 -217 l-4 -168 -59 0 -59 0 0 118 c0 156 13 233 55 318 60 122
194 227 326 253 24 5 285 9 579 8 l535 -2 60 -24z m-105 -336 c50 -26 60 -59
60 -205 l0 -130 -580 0 -580 0 0 130 c0 145 10 178 58 204 41 23 999 23 1042
1z m-2111 -228 c35 -12 64 -45 76 -84 l6 -23 -290 0 -291 0 0 24 c0 29 50 83
83 89 52 10 383 5 416 -6z m3590 7 c41 -8 91 -58 91 -90 l0 -24 -291 0 -290 0
6 23 c12 39 41 72 76 84 36 13 352 18 408 7z m269 -366 c13 -9 31 -27 40 -40
16 -21 17 -139 20 -1443 2 -1362 1 -1421 -16 -1454 -10 -19 -34 -43 -53 -53
-32 -17 -123 -18 -2259 -18 -2136 0 -2227 1 -2259 18 -19 10 -43 34 -53 53
-17 32 -18 97 -18 1442 0 1266 2 1412 16 1442 17 37 47 61 85 68 13 2 1025 4
2249 3 2055 -1 2227 -2 2248 -18z"/>
    <path d="M2395 3223 c-63 -9 -188 -44 -261 -73 -463 -185 -757 -668 -707
-1163 50 -485 382 -870 863 -999 108 -29 353 -36 474 -14 502 95 877 503 929
1013 59 581 -356 1127 -932 1228 -77 14 -291 18 -366 8z m390 -251 c268 -73
471 -241 591 -487 144 -297 110 -660 -86 -925 -174 -234 -441 -370 -730 -370
-246 0 -487 103 -652 278 -83 88 -120 143 -169 246 -110 235 -112 520 -5 751
127 274 366 463 661 521 96 19 298 12 390 -14z"/>
    <path d="M2344 2771 c-49 -22 -97 -78 -113 -130 -6 -21 -11 -77 -11 -125 l0
-86 -97 0 c-115 0 -163 -17 -210 -74 -44 -54 -53 -97 -53 -261 0 -164 9 -207
52 -260 50 -60 92 -75 208 -75 l100 0 0 -86 c0 -103 13 -150 53 -200 54 -65
88 -74 287 -74 199 0 233 9 287 74 40 50 53 97 53 200 l0 86 100 0 c116 0 158
15 208 75 43 53 52 97 52 254 0 164 -10 214 -53 266 -47 58 -95 75 -209 75
l-98 0 0 86 c0 103 -13 150 -53 200 -54 65 -88 74 -287 74 -149 0 -181 -3
-216 -19z m326 -311 c0 -111 13 -151 67 -202 47 -45 92 -58 198 -58 l95 0 0
-105 0 -105 -87 0 c-108 0 -153 -12 -199 -52 -60 -52 -74 -93 -74 -208 l0
-100 -110 0 -110 0 0 100 c0 111 -13 151 -67 202 -47 45 -92 58 -198 58 l-95
0 0 105 0 105 95 0 c106 0 151 13 198 58 54 51 67 91 67 202 l0 100 110 0 110
0 0 -100z"/>
  </g>
</svg>
          ) : (
              <svg className="IconDesactive" version="1.0" xmlns="http://www.w3.org/2000/svg"
              width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
              preserveAspectRatio="xMidYMid meet">

              <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                fill="#909090" stroke="none">
                <path d="M1950 4755 c-36 -8 -108 -35 -160 -61 -79 -39 -110 -62 -181 -133
-73 -72 -94 -101 -132 -181 -60 -125 -77 -211 -77 -395 l0 -145 -59 0 -58 0
-7 49 c-9 67 -58 162 -108 206 -22 21 -66 49 -97 64 l-56 26 -260 0 -260 0
-57 -28 c-112 -55 -181 -150 -201 -276 -10 -62 -13 -67 -46 -84 -80 -39 -151
-128 -175 -218 -16 -59 -17 -180 -14 -1514 l3 -1450 28 -57 c36 -73 101 -139
175 -175 l57 -28 2295 0 2295 0 57 28 c74 36 139 102 175 175 l28 57 3 1450
c3 1626 8 1526 -69 1627 -36 49 -121 118 -144 118 -6 0 -15 31 -21 69 -6 38
-21 90 -34 115 -30 63 -103 134 -170 165 -55 26 -56 26 -315 26 l-260 0 -56
-26 c-31 -15 -75 -43 -97 -64 -50 -44 -99 -139 -108 -206 l-7 -49 -52 0 -53 0
-5 178 c-6 200 -15 244 -78 370 -76 155 -230 288 -400 348 l-84 29 -575 2
c-464 1 -588 -1 -640 -12z m1235 -244 c121 -48 206 -126 261 -236 40 -81 53
-164 54 -327 l0 -108 -64 0 -64 0 -4 168 c-3 160 -4 169 -31 220 -37 70 -97
128 -166 161 l-56 26 -555 0 -555 0 -57 -27 c-69 -32 -135 -96 -168 -163 -23
-46 -25 -64 -28 -217 l-4 -168 -59 0 -59 0 0 118 c0 156 13 233 55 318 60 122
194 227 326 253 24 5 285 9 579 8 l535 -2 60 -24z m-105 -336 c50 -26 60 -59
60 -205 l0 -130 -580 0 -580 0 0 130 c0 145 10 178 58 204 41 23 999 23 1042
1z m-2111 -228 c35 -12 64 -45 76 -84 l6 -23 -290 0 -291 0 0 24 c0 29 50 83
83 89 52 10 383 5 416 -6z m3590 7 c41 -8 91 -58 91 -90 l0 -24 -291 0 -290 0
6 23 c12 39 41 72 76 84 36 13 352 18 408 7z m269 -366 c13 -9 31 -27 40 -40
16 -21 17 -139 20 -1443 2 -1362 1 -1421 -16 -1454 -10 -19 -34 -43 -53 -53
-32 -17 -123 -18 -2259 -18 -2136 0 -2227 1 -2259 18 -19 10 -43 34 -53 53
-17 32 -18 97 -18 1442 0 1266 2 1412 16 1442 17 37 47 61 85 68 13 2 1025 4
2249 3 2055 -1 2227 -2 2248 -18z"/>
                <path d="M2395 3223 c-63 -9 -188 -44 -261 -73 -463 -185 -757 -668 -707
-1163 50 -485 382 -870 863 -999 108 -29 353 -36 474 -14 502 95 877 503 929
1013 59 581 -356 1127 -932 1228 -77 14 -291 18 -366 8z m390 -251 c268 -73
471 -241 591 -487 144 -297 110 -660 -86 -925 -174 -234 -441 -370 -730 -370
-246 0 -487 103 -652 278 -83 88 -120 143 -169 246 -110 235 -112 520 -5 751
127 274 366 463 661 521 96 19 298 12 390 -14z"/>
                <path d="M2344 2771 c-49 -22 -97 -78 -113 -130 -6 -21 -11 -77 -11 -125 l0
-86 -97 0 c-115 0 -163 -17 -210 -74 -44 -54 -53 -97 -53 -261 0 -164 9 -207
52 -260 50 -60 92 -75 208 -75 l100 0 0 -86 c0 -103 13 -150 53 -200 54 -65
88 -74 287 -74 199 0 233 9 287 74 40 50 53 97 53 200 l0 86 100 0 c116 0 158
15 208 75 43 53 52 97 52 254 0 164 -10 214 -53 266 -47 58 -95 75 -209 75
l-98 0 0 86 c0 103 -13 150 -53 200 -54 65 -88 74 -287 74 -149 0 -181 -3
-216 -19z m326 -311 c0 -111 13 -151 67 -202 47 -45 92 -58 198 -58 l95 0 0
-105 0 -105 -87 0 c-108 0 -153 -12 -199 -52 -60 -52 -74 -93 -74 -208 l0
-100 -110 0 -110 0 0 100 c0 111 -13 151 -67 202 -47 45 -92 58 -198 58 l-95
0 0 105 0 105 95 0 c106 0 151 13 198 58 54 51 67 91 67 202 l0 100 110 0 110
0 0 -100z"/>
              </g>
            </svg>
          )}

          </div>
          <div className={RolActivo === 'Psicología' ? 'containerOptionActive' : 'containerOption'}>
          {RolActivo === "Psicología" ? (
  <svg className="IconDesactive" version="1.0" xmlns="http://www.w3.org/2000/svg"
  width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
  preserveAspectRatio="xMidYMid meet">

  <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
    fill="#fff" stroke="none">
    <path d="M0 5031 l0 -89 183 -4 c150 -4 192 -9 238 -26 134 -48 232 -146 286
-282 16 -41 18 -112 23 -825 6 -692 8 -791 24 -875 118 -627 591 -1115 1207
-1249 52 -11 130 -23 174 -26 44 -4 99 -13 122 -21 50 -18 98 -69 112 -121 17
-61 14 -882 -3 -964 -20 -92 -58 -163 -125 -230 -100 -100 -211 -139 -398
-139 l-103 0 0 -90 0 -90 820 0 820 0 0 90 0 90 -102 0 c-189 0 -296 38 -399
140 -66 66 -105 137 -125 229 -17 82 -20 903 -3 964 14 52 62 103 112 121 23
8 78 17 122 21 177 14 360 66 540 156 217 107 413 270 558 464 130 174 240
431 284 660 15 78 18 191 23 870 6 852 3 805 64 910 29 48 98 119 146 150 90
57 143 68 338 73 l182 4 0 89 0 89 -341 0 c-273 0 -354 -3 -409 -16 -165 -37
-307 -189 -340 -363 -6 -34 -10 -352 -10 -856 0 -879 -1 -889 -60 -1067 -60
-180 -143 -311 -285 -454 -55 -56 -129 -120 -164 -144 -134 -90 -294 -156
-444 -185 -163 -31 -242 -13 -294 67 l-28 42 -3 1170 c-2 821 1 1191 8 1238
16 95 60 179 127 246 106 104 212 142 401 142 l102 0 0 90 0 90 -820 0 -820 0
0 -90 0 -90 103 0 c188 0 297 -39 399 -140 68 -69 112 -153 128 -248 7 -47 10
-417 8 -1238 l-3 -1170 -28 -42 c-52 -80 -132 -98 -294 -67 -412 79 -759 382
-892 781 -60 180 -61 189 -61 1063 0 463 -4 821 -10 855 -30 182 -183 342
-360 376 -29 6 -205 10 -391 10 l-339 0 0 -89z"/>
  </g>
</svg>
          ) : (
            <svg className="IconDesactive" version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet">

            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              fill="#909090" stroke="none">
              <path d="M0 5031 l0 -89 183 -4 c150 -4 192 -9 238 -26 134 -48 232 -146 286
-282 16 -41 18 -112 23 -825 6 -692 8 -791 24 -875 118 -627 591 -1115 1207
-1249 52 -11 130 -23 174 -26 44 -4 99 -13 122 -21 50 -18 98 -69 112 -121 17
-61 14 -882 -3 -964 -20 -92 -58 -163 -125 -230 -100 -100 -211 -139 -398
-139 l-103 0 0 -90 0 -90 820 0 820 0 0 90 0 90 -102 0 c-189 0 -296 38 -399
140 -66 66 -105 137 -125 229 -17 82 -20 903 -3 964 14 52 62 103 112 121 23
8 78 17 122 21 177 14 360 66 540 156 217 107 413 270 558 464 130 174 240
431 284 660 15 78 18 191 23 870 6 852 3 805 64 910 29 48 98 119 146 150 90
57 143 68 338 73 l182 4 0 89 0 89 -341 0 c-273 0 -354 -3 -409 -16 -165 -37
-307 -189 -340 -363 -6 -34 -10 -352 -10 -856 0 -879 -1 -889 -60 -1067 -60
-180 -143 -311 -285 -454 -55 -56 -129 -120 -164 -144 -134 -90 -294 -156
-444 -185 -163 -31 -242 -13 -294 67 l-28 42 -3 1170 c-2 821 1 1191 8 1238
16 95 60 179 127 246 106 104 212 142 401 142 l102 0 0 90 0 90 -820 0 -820 0
0 -90 0 -90 103 0 c188 0 297 -39 399 -140 68 -69 112 -153 128 -248 7 -47 10
-417 8 -1238 l-3 -1170 -28 -42 c-52 -80 -132 -98 -294 -67 -412 79 -759 382
-892 781 -60 180 -61 189 -61 1063 0 463 -4 821 -10 855 -30 182 -183 342
-360 376 -29 6 -205 10 -391 10 l-339 0 0 -89z"/>
            </g>
          </svg>
          )}

          </div>
          <div className={RolActivo === 'Instructor' ? 'containerOptionActive' : 'containerOption'}>
          {RolActivo === "Instructor" ? (
  <svg className="IconDesactive" version="1.0" xmlns="http://www.w3.org/2000/svg"
  width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
  preserveAspectRatio="xMidYMid meet">

  <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
    fill="#fff" stroke="none">
    <path d="M1887 5099 c-25 -13 -44 -34 -57 -62 -34 -71 -622 -2456 -617 -2499
6 -48 38 -91 81 -112 29 -14 82 -16 390 -16 196 0 356 -2 356 -5 0 -3 -187
-505 -415 -1116 -228 -612 -415 -1125 -415 -1141 0 -74 75 -148 149 -148 81 0
26 -70 1311 1701 664 916 1215 1680 1224 1697 35 67 5 157 -64 192 -37 19 -58
20 -370 20 -181 0 -330 2 -330 5 0 3 168 288 374 633 205 345 381 641 390 659
35 69 5 158 -64 193 -38 20 -56 20 -972 20 -913 -1 -934 -1 -971 -21z m1603
-284 c0 -3 -168 -288 -374 -633 -205 -345 -381 -641 -390 -659 -35 -69 -5
-158 64 -193 37 -19 58 -20 355 -20 174 0 315 -4 313 -8 -7 -18 -1551 -2142
-1555 -2139 -2 2 112 311 252 687 140 376 255 696 255 712 0 43 -36 105 -73
125 -28 16 -73 19 -408 23 l-375 5 258 1040 c142 572 260 1046 263 1053 3 9
155 12 710 12 388 0 705 -2 705 -5z"/>
  </g>
</svg>
          ) : (
                   <svg className="IconDesactive" version="1.0" xmlns="http://www.w3.org/2000/svg"
              width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
              preserveAspectRatio="xMidYMid meet">

              <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                fill="#909090" stroke="none">
                <path d="M1887 5099 c-25 -13 -44 -34 -57 -62 -34 -71 -622 -2456 -617 -2499
6 -48 38 -91 81 -112 29 -14 82 -16 390 -16 196 0 356 -2 356 -5 0 -3 -187
-505 -415 -1116 -228 -612 -415 -1125 -415 -1141 0 -74 75 -148 149 -148 81 0
26 -70 1311 1701 664 916 1215 1680 1224 1697 35 67 5 157 -64 192 -37 19 -58
20 -370 20 -181 0 -330 2 -330 5 0 3 168 288 374 633 205 345 381 641 390 659
35 69 5 158 -64 193 -38 20 -56 20 -972 20 -913 -1 -934 -1 -971 -21z m1603
-284 c0 -3 -168 -288 -374 -633 -205 -345 -381 -641 -390 -659 -35 -69 -5
-158 64 -193 37 -19 58 -20 355 -20 174 0 315 -4 313 -8 -7 -18 -1551 -2142
-1555 -2139 -2 2 112 311 252 687 140 376 255 696 255 712 0 43 -36 105 -73
125 -28 16 -73 19 -408 23 l-375 5 258 1040 c142 572 260 1046 263 1053 3 9
155 12 710 12 388 0 705 -2 705 -5z"/>
              </g>
            </svg>
          )}

          </div>
          <div className="containerOption" >
            <svg className="IconSalir" version="1.0" xmlns="http://www.w3.org/2000/svg"
              width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
              preserveAspectRatio="xMidYMid meet">

              <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                fill="#1E1E1E" stroke="none">
                <path d="M482 5090 c-178 -47 -332 -171 -411 -331 -76 -154 -71 2 -71 -2199 0
-1696 2 -1985 15 -2045 49 -232 236 -425 471 -485 74 -19 115 -20 1094 -20
l1016 0 51 25 c72 36 106 90 111 175 4 81 -23 140 -87 185 l-43 30 -1021 5
-1022 5 -40 22 c-50 27 -80 58 -100 105 -13 33 -15 251 -15 1998 0 1747 2
1965 15 1998 20 47 50 78 100 105 l40 22 1022 5 1021 5 43 30 c64 45 91 104
87 185 -5 85 -39 139 -111 175 l-51 25 -1020 -1 c-972 0 -1025 -1 -1094 -19z"/>
                <path d="M3556 4040 c-135 -43 -196 -206 -118 -317 15 -21 232 -240 482 -488
250 -247 457 -453 458 -457 2 -5 -563 -8 -1255 -8 l-1259 0 -44 -22 c-55 -29
-95 -79 -112 -140 -24 -91 24 -190 112 -235 l44 -23 1259 0 c692 0 1257 -3
1255 -8 -1 -4 -208 -210 -458 -457 -250 -248 -467 -467 -482 -488 -121 -172
85 -399 275 -300 40 20 1363 1327 1385 1368 22 40 22 150 0 190 -22 42 -1345
1348 -1386 1369 -40 21 -117 29 -156 16z"/>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHome;