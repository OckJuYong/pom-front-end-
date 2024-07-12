import { create } from "@mui/material/styles/createTransitions";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const postList = createSlice({
  name: "postList",
  initialState: [
    {
      id: 1,
      title: "제목1 : 네이버 상반기 채용 공고",
      author: "홍길동",
      date: "2024-01-01",
      exp: "2024-05-01",
    },
    {
      id: 2,
      title: "제목2 : 카카오 상반기 채용 공고",
      author: "아무개",
      date: "2024-12-31",
      exp: "2024-05-01",
    },
  ],
  reducers: {},
});

const savePost = createSlice({
  name: "savePost",
  initialState: {
    employmentId: "test",
    employmentName: "김영권",
    title: "",
    postTime: "20240201",
    endTime: "20240209",
    portfolio_yn: "y",
    contents: "",
    article: {
      recruitment_part: "풀스택",
      recruitment_requirement: "자격조건",
      recruitment_condition: "모집분야",
    },
    category: {
      history_yn: "y",
      education_yn: "y",
      tech_yn: "y",
      voca_yn: "n",
      awards_yn: "n",
    },
  },
  reducers: {
    saveTitle(state, action) {
      state.title = action.payload;
    },
    saveContent(state, action) {
      state.content = action.payload;
    },
  },
});

const usersheet = createSlice({
  name: "usersheet",
  initialState: {
    army_yn: "",
    army_start_period: "",
    army_end_period: "",
    army_position: "",
    army_rank: "",
    army_number: "",
    reason_no_army: "",
    education: {
      edu_level: "",
      edu_status: "",
      start_period: "",
      end_period: "",
      school_name: "",
      plural_type: "",
      plural_name: "",
      grade: "",
      standard_grade: "",
      major: "",
    },
    history: [
      {
        id: 0,
        history_start_period: "",
        history_end_period: "",
        history_company: "",
        history_position: "",
        history_department: "",
      },
    ],
    tech: [
      {
        id: 0,
        tech_name: "",
        tech_get_day: "",
        tech_issuer: "",
      },
    ],
    lang: [
      {
        id: 0,
        lang_name: "",
        lang_test_name: "",
        lang_score: "",
        lang_date: "",
      },
    ],
    award: [
      {
        id: 0,
        award_name: "",
        award_organization: "",
        award_get: "",
      },
    ],
  },
  reducers: {
    //////////// Army Comp
    ArmyYN(state, action) {
      state.army_yn = action.payload;
    },
    ReasonNo(state, action) {
      state.reason_no_army = action.payload;
    },
    setStartArmy(state, action) {
      state.army_start_period = action.payload;
    },
    setEndArmy(state, action) {
      state.army_end_period = action.payload;
    },
    setWhichSurved(state, action) {
      state.army_position = action.payload;
    },
    setMilRank(state, action) {
      state.army_rank = action.payload;
    },
    setSurvNum(state, action) {
      state.army_number = action.payload;
    },
    //////////// Edu Comp
    setEducation(state, action) {
      state.education.edu_level = action.payload;
    },
    setEduStartDate(state, action) {
      state.education.start_period = action.payload;
    },
    setEduEndDate(state, action) {
      state.education.end_period = action.payload;
    },
    setEduPassedDay(state, action) {
      state.education.start_period = action.payload;
      state.education.end_period = action.payload;
    },
    setSchoolName(state, action) {
      state.education.school_name = action.payload;
    },
    setEduStatus(state, action) {
      state.education.edu_status = action.payload;
    },
    setMajor(state, action) {
      state.education.major = action.payload;
    },
    setPlural(state, action) {
      state.education.plural_name = action.payload;
    },
    setPluralType(state, action) {
      state.education.plural_type = action.payload;
    },
    setGrade(state, action) {
      state.education.grade = action.payload;
    },
    setStandardGrade(state, action) {
      state.education.standard_grade = action.payload;
    },
    //////////// His Comp
    addHis(state, action) {
      state.history.push(action.payload);
    },
    deleteHis(state, action) {
      const index = state.history.findIndex((item) => {
        return item.id === action.payload;
      });
      state.history.splice(index, 1);
    },
    setStartHis(state, action) {
      const [index, value] = action.payload;
      state.history[index].history_start_period = value;
    },
    setEndHis(state, action) {
      const [index, value] = action.payload;
      state.history[index].history_end_period = value;
    },
    setHisCompanyNm(state, action) {
      const [index, value] = action.payload;
      state.history[index].history_company = value;
    },
    setHisPosition(state, action) {
      const [index, value] = action.payload;
      state.history[index].history_position = value;
    },
    setHisDepartment(state, action) {
      const [index, value] = action.payload;
      state.history[index].history_department = value;
    },
    //////////// Lang Comp
    addLang(state, action) {
      state.lang.push(action.payload);
    },
    deleteLang(state, action) {
      const index = state.lang.findIndex((item) => {
        return item.id === action.payload;
      });
      state.lang.splice(index, 1);
    },
    setLang(state, action) {
      const [index, value] = action.payload;
      state.lang[index].lang_name = value;
    },
    setLangTestNm(state, action) {
      const [index, value] = action.payload;
      state.lang[index].lang_test_name = value;
    },
    setLangCertGetDay(state, action) {
      const [index, value] = action.payload;
      state.lang[index].lang_date = value;
    },
    setLangTestRank(state, action) {
      // 급수랑 점수 통합한 관계로 변경. 일단 함수는 유지.
      const [index, value] = action.payload;
      state.lang[index].lang_score = value;
    },
    setLangScore(state, action) {
      const [index, value] = action.payload;
      state.lang[index].lang_score = value;
    },
    //////////// Tech Comp
    setTechCertNm(state, action) {
      const [index, value] = action.payload;
      state.tech[index].tech_name = value;
    },
    setTechCertIssuer(state, action) {
      const [index, value] = action.payload;
      state.tech[index].tech_issuer = value;
    },
    setTechCertGetDay(state, action) {
      const [index, value] = action.payload;
      state.tech[index].tech_get_day = value;
    },
    addTech(state, action) {
      state.tech.push(action.payload);
    },
    deleteTech(state, action) {
      const index = state.tech.findIndex((item) => {
        return item.id === action.payload;
      });
      state.tech.splice(index, 1);
    },
    //////////// Award Comp
    addAward(state, action) {
      state.award.push(action.payload);
    },
    deleteAward(state, action) {
      const index = state.award.findIndex((item) => {
        return item.id === action.payload;
      });
      state.award.splice(index, 1);
    },
    setPrizeNm(state, action) {
      const [index, value] = action.payload;
      state.award[index].awards_name = value;
    },
    setPrizeOrgan(state, action) {
      const [index, value] = action.payload;
      state.award[index].awards_organization = value;
    },
    setAwardGetDay(state, action) {
      const [index, value] = action.payload;
      state.award[index].awards_get = value;
    },
  },
});

const selection = createSlice({
  name: "selection",
  initialState: {
    selec: "1",
  },
  reducers: {
    modify(state, action) {
      state.selec = action.payload;
    },
  },
});

export let {
  ArmyYN,
  ReasonNo,
  setStartArmy,
  setEndArmy,
  setWhichSurved,
  setMilRank,
  setSurvNum,
  ////////////////////
  setEducation,
  setEduStartDate,
  setEduEndDate,
  setEduPassedDay,
  setSchoolName,
  setEduStatus,
  setMajor,
  setPlural,
  setPluralType,
  setGrade,
  setStandardGrade,
  ////////////////////
  addHis,
  deleteHis,
  setStartHis,
  setEndHis,
  setHisCompanyNm,
  setHisPosition,
  setHisDepartment,
  ///////////////////
  addLang,
  deleteLang,
  setLang,
  setLangTestNm,
  setLangTestRank,
  setLangCertGetDay,
  setLangScore,
  //////////////////
  setTechCertNm,
  setTechCertIssuer,
  setTechCertGetDay,
  addTech,
  deleteTech,
  //////////////////
  addAward,
  deleteAward,
  setPrizeNm,
  setPrizeOrgan,
  setAwardGetDay,
} = usersheet.actions;

export let { saveTitle, saveContent } = savePost.actions;

export let { modify } = selection.actions;

export default configureStore({
  reducer: {
    // 작명 : state이름.reducer <--- .reducer 안쓰면 적용 안됨.
    postList: postList.reducer,
    usersheet: usersheet.reducer,
    savePost: savePost.reducer,
    selection: selection.reducer,
  },
});
