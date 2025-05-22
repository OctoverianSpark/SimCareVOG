import React, { useEffect, useRef, useState } from 'react'
import SavingsInfo from './views/form/SavingsInfo.jsx'
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Terms from './views/form/Terms.jsx'
import AboutMe from './views/form/AboutMe.jsx'
import MyDirection from './views/form/MyDirection.jsx'
import MyPostalDirection from './views/form/MyPostalDirection.jsx'
import MyContact from './views/form/MyContactInfo.jsx'
import PreferredLang from './views/form/PreferredLang.jsx'
import ContactPreferences from './views/form/ContactPreferences.jsx'
import ProfessionalHelp from './views/form/ProfessionalHelp.jsx'
import HouseHold from './views/form/HouseHold.jsx'
import AddHouseHold from './views/form/AddHouseHold.jsx'
import EditHouseHold from './views/form/EditHouseHold.jsx'
import DeleteHouseHold from './views/form/DeleteHouseHold.jsx'
import MedicareInscription from './views/form/MedicareInscription.jsx'
import Section2 from './views/form/Section2.jsx'
import CivilState from './views/form/CivilState.jsx'
import HomeTaxDeclarations from './views/form/HomeTaxDeclarations.jsx'
import WhereTheyLive from './views/form/WhereTheyLive.jsx'
import DirConfirm from './views/form/DirConfirm.jsx'
import HouseInfo from './views/form/HouseInfo.jsx'
import HomeInfo from './views/form/HomeInfo.jsx'
import SSNCheck from './views/form/SSNCheck.jsx'
import Citizenship from './views/form/Citizenship.jsx'
import MigStatus from './views/form/MigStatus.jsx'
import MigStatus2 from './views/form/MigStatus2.jsx'
import MilitaryServices from './views/form/MilitaryServices.jsx'
import Disabilities from './views/form/Disabilities.jsx'
import MedicaidCHIPEnd from './views/form/MedicaidCHIPEnd.jsx'
import MedicaidChipDenied from './views/form/MedicaidChipDenied.jsx'
import Section3 from './views/form/Section3.jsx'
import Income from './views/form/Income.jsx'
import EstimatedIncome from './views/form/EstimatedIncome.jsx'
import IncomeInfo from './views/form/IncomeInfo.jsx'
import ActualHomeCover from './views/form/ActualHomeCover.jsx'
import EnrolledTo from './views/form/EnrolledTo.jsx'
import HRAInfo from './views/form/HRAInfo.jsx'
import HRAIndividualCover from './views/form/HRAIndividualCover.jsx'
import JobBasedOffers from './views/form/JobBasedOffers.jsx'
import JobBasedCoverInfo from './views/form/JobBasedCoverInfo.jsx'
import EligibilityInfo from './views/form/EligibilityInfo.jsx'
import MedRefundOffers from './views/form/MedRefundOffers.jsx'
import RecentChanges from './views/form/RecentChanges.jsx'
import FutureChanges from './views/form/FutureChanges.jsx'
import LifeChanges from './views/form/LifeChanges.jsx'
import FinalSectionWelcome from './views/form/FinalSectionWelcome.jsx'
import FinalCheck from './views/form/FinalCheck.jsx'
import FinalTerms from './views/form/FinalTerms.jsx'
import Sign from './views/form/Sign.jsx'
import Index from './views/page/Index.jsx'
import Record from './views/page/Record.jsx'
import LogIn from './views/admin/LogIn.jsx'
import axios from 'axios'
import Simulations from './views/admin/Simulations.jsx'
import Admin from './views/admin/Admin.jsx'
import Congratulations from './views/form/Congratulations.jsx'


const token = localStorage.getItem('token')

if (location.pathname.includes('/admin') && location.pathname != '/admin/login' && !token) {

  location.href = '/'

}




export default function App() {



  return (
    <div className='app'>
      <div className='header'>
        <h1 className='mainLogo'>
          Sim<span>Care</span>.vog
        </h1>
      </div>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/record' element={<Record />} />
          <Route path='/terms' element={<Terms />} />
          <Route path='/savings' element={<SavingsInfo />} />
          <Route path='/about-me' element={<AboutMe />} />
          <Route path='/direction' element={<MyDirection />} />
          <Route path='/postaldir' element={<MyPostalDirection />} />
          <Route path='/mycontact' element={<MyContact />} />
          <Route path='/preferred-lang' element={<PreferredLang />} />
          <Route path='/contact-preferences' element={<ContactPreferences />} />
          <Route path='/professional-help' element={<ProfessionalHelp />} />
          <Route path='/household' element={<HouseHold />} />
          <Route path='/household/add' element={<AddHouseHold />} />
          <Route path='/household/edit' element={<EditHouseHold />} />
          <Route path='/household/delete' element={<DeleteHouseHold />} />
          <Route path='/medicare-inscription' element={<MedicareInscription />} />
          <Route path='/section2-welcome' element={<Section2 />} />
          <Route path='/civil-state' element={<CivilState />} />
          <Route path='/home-tax-declarations' element={<HomeTaxDeclarations />} />
          <Route path='/where-they-live' element={<WhereTheyLive />} />
          <Route path='/dir-confirmation' element={<DirConfirm />} />
          <Route path='/house-info' element={<HouseInfo />} />
          <Route path='/home-info' element={<HomeInfo />} />
          <Route path='/ssn-check' element={<SSNCheck />} />
          <Route path='/citizenship' element={<Citizenship />} />
          <Route path='/mig-status' element={<MigStatus />} />
          <Route path='/mig-status-2' element={<MigStatus2 />} />
          <Route path='/militar-service' element={<MilitaryServices />} />
          <Route path='/disabilities' element={<Disabilities />} />
          <Route path='/medicaid-chip-end' element={<MedicaidCHIPEnd />} />
          <Route path='/medicaid-chip-denied' element={<MedicaidChipDenied />} />
          <Route path='/income-info' element={<IncomeInfo />} />
          <Route path='/income' element={<Income />} />
          <Route path='/estimated-income' element={<EstimatedIncome />} />
          <Route path='/section3-welcome' element={<Section3 />} />
          <Route path='/actual-home-cover' element={<ActualHomeCover />} />
          <Route path='/enrolled-to' element={<EnrolledTo />} />
          <Route path='/hra-info' element={<HRAInfo />} />
          <Route path='/hra-individual-cover' element={<HRAIndividualCover />} />
          <Route path='/job-based-cover-info' element={<JobBasedCoverInfo />} />
          <Route path='/job-based-offers' element={<JobBasedOffers />} />
          <Route path='/eligibility-info' element={<EligibilityInfo />} />
          <Route path='/med-refund-offers' element={<MedRefundOffers />} />
          <Route path='/recent-changes' element={<RecentChanges />} />
          <Route path='/future-changes' element={<FutureChanges />} />
          <Route path='/life-changes' element={<LifeChanges />} />
          <Route path='/final-section-welcome' element={<FinalSectionWelcome />} />
          <Route path='/final-check' element={<FinalCheck />} />
          <Route path='/final-terms' element={<FinalTerms />} />
          <Route path='/sign' element={<Sign />} />
          <Route path='/admin/login' element={<LogIn />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/admin/simulations' element={<Simulations />} />
          <Route path='/congratulations' element={<Congratulations />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
